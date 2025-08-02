'use server';

import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

// USERS
export async function createUser({ name, email, phone, userType }: { name: string, email: string, phone?: string, userType: 'User' | 'Librarian' | 'Admin' }) {
  return prisma.user.create({
    data: {
      name,
      email,
      phone,
      userType
    }
  });
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

// CREDENTIALS
export async function createCredential({ userId, username, password }: { userId: number, username: string, password: string }) {
  const passwordHash = await hash(password, 10);
  return prisma.credential.create({
    data: {
      userId,
      username,
      passwordHash,
    },
  });
}

// LIBRARIAN
export async function createLibrarian({ userId, staffId }: { userId: number, staffId: string }) {
  return prisma.librarian.create({
    data: {
      userId,
      staffId,
    },
  });
}

// RESOURCE
export async function addResource({ title, resourceType, publisher, yearPublished, totalCopies, availableCopies, categoryId }: {
  title: string,
  resourceType: 'Book' | 'Magazine' | 'DVD' | 'Ebook',
  publisher?: string,
  yearPublished?: number,
  totalCopies: number,
  availableCopies: number,
  categoryId?: number
}) {
  return prisma.resource.create({
    data: {
      title,
      resourceType,
      publisher,
      yearPublished,
      totalCopies,
      availableCopies,
      categoryId,
    },
  });
}

export async function getAllResourceIds(): Promise<number[]> {
  try{const resources = await prisma.resource.findMany({
    select: { id: true },
  });
  return resources.map((r) => r.id);}
  catch(all){
    return []
  }
}

export async function getResourceById(id: number) {
  return await prisma.resource.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}


export async function getFilteredResources(filters: any) {
  const { type, year, publisher, category, sortField, sortOrder } = filters;

  return await prisma.resource.findMany({
    where: {
      ...(type && { resourceType: type }),
      ...(year && { yearPublished: parseInt(year) }),
      ...(publisher && { publisher: { contains: publisher, mode: 'insensitive' } }),
      ...(category && {
        category: {
          name: { contains: category, mode: 'insensitive' },
        },
      }),
    },
    orderBy: {
      [sortField || 'createdAt']: sortOrder || 'desc',
    },
  });
}



export async function getAllPublishers() {
  return prisma.resource.findMany({
    distinct: ['publisher'],
    select: { publisher: true },
    where: { publisher: { not: null } },
  });
}

export async function getAllYears() {
  return prisma.resource.findMany({
    distinct: ['yearPublished'],
    select: { yearPublished: true },
    where: { yearPublished: { not: null } },
    orderBy: { yearPublished: 'desc' },
  });
}


// Component support hooks
export async function getAllFilterOptions() {
  const [categories, publishers, years] = await Promise.all([
    getAllCategories(),
    getAllPublishers(),
    getAllYears(),
  ]);
  return { categories, publishers, years };
}


export async function getAllResources() {
  return prisma.resource.findMany({ include: { book: true, magazine: true, dvd: true, ebook: true } });
}

// BOOK / MAGAZINE / DVD / EBOOK Subtypes
export async function createBook({ resourceId, author, isbn }: { resourceId: number, author: string, isbn: string }) {
  return prisma.book.create({ data: { resourceId, author, isbn } });
}

export async function createMagazine({ resourceId, issueNumber, month }: { resourceId: number, issueNumber: string, month: string }) {
  return prisma.magazine.create({ data: { resourceId, issueNumber, month } });
}

export async function createDVD({ resourceId, durationMin, director }: { resourceId: number, durationMin: number, director: string }) {
  return prisma.dVD.create({ data: { resourceId, durationMin, director } });
}

export async function createEbook({ resourceId, fileUrl, format }: { resourceId: number, fileUrl: string, format: string }) {
  return prisma.ebook.create({ data: { resourceId, fileUrl, format } });
}

// TRANSACTION
export async function createTransaction({ userId, resourceId, issueDate, dueDate }: {
  userId: number, resourceId: number, issueDate: Date, dueDate: Date
}) {
  return prisma.transaction.create({
    data: {
      userId,
      resourceId,
      issueDate,
      dueDate,
      status: 'Issued',
    }
  });
}

// RESERVATION
export async function createReservation({ userId, resourceId }: { userId: number, resourceId: number }) {
  return prisma.reservation.create({
    data: {
      userId,
      resourceId,
    }
  });
}

// AUDIT LOG
export async function logAudit({ userId, action }: { userId: number, action: string }) {
  return prisma.auditLog.create({
    data: {
      userId,
      action
    }
  });
}

// ADMIN
export async function createAdmin({ username, email, password }: { username: string, email: string, password: string }) {
  const passwordHash = await hash(password, 10);
  return prisma.admin.create({
    data: {
      username,
      email,
      passwordHash,
    }
  });
}

// CATEGORY
export async function createCategory({ name }: { name: string }) {
  return prisma.category.create({ data: { name } });
}

export async function getAllCategories() {
  return prisma.category.findMany();
}

// FINE
export async function createFine({ transactionId, amount }: { transactionId: number, amount: number }) {
  return prisma.fine.create({
    data: {
      transactionId,
      amount,
    }
  });
}

export async function markFinePaid({ fineId }: { fineId: number }) {
  return prisma.fine.update({
    where: { id: fineId },
    data: { paid: true, paidDate: new Date() }
  });
}
