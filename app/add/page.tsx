'use client';

import React, { useState } from 'react';
import { addResource } from '@/app/actions/serverActions';

const resourceTypes = ['Book', 'Magazine', 'DVD', 'Ebook'];

interface AddResourceFormProps {
  categories: { id: number; name: string }[];
  onSubmitSuccess?: () => void;
}

export default function AddResourceForm() {
  const [formData, setFormData] = useState({
    title: '',
    resourceType: 'Book',
    publisher: '',
    yearPublished: '',
    totalCopies: '',
    availableCopies: '',
    categoryId: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    await addResource({
      title: formData.title,
      resourceType: formData.resourceType as 'Book' | 'Magazine' | 'DVD' | 'Ebook',
      publisher: formData.publisher || undefined,
      yearPublished: formData.yearPublished ? parseInt(formData.yearPublished) : undefined,
      totalCopies: parseInt(formData.totalCopies),
      availableCopies: parseInt(formData.availableCopies),
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,
    });

    setFormData({
      title: '',
      resourceType: 'Book',
      publisher: '',
      yearPublished: '',
      totalCopies: '',
      availableCopies: '',
      categoryId: '',
    });
  } catch (err) {
    setError((err as Error).message);
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-gray-700 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-2">Add Resource</h2>

      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Resource Type</label>
        <select
          name="resourceType"
          value={formData.resourceType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {resourceTypes.map(type => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Publisher</label>
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Year Published</label>
        <input
          type="number"
          name="yearPublished"
          min="1000"
          max="9999"
          value={formData.yearPublished}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Total Copies</label>
          <input
            type="number"
            name="totalCopies"
            required
            min="1"
            value={formData.totalCopies}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Available Copies</label>
          <input
            type="number"
            name="availableCopies"
            required
            min="0"
            value={formData.availableCopies}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="test">test</option>
        </select>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        {loading ? 'Submitting...' : 'Add Resource'}
      </button>
    </form>
  );
}
