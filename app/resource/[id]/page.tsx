// This is a server component in the Next.js App Router
import { getResourceById } from '@/app/actions/serverActions';
import { notFound } from 'next/navigation';

function getResourceImage(resourceType: string) {
  switch (resourceType) {
    case 'Book':
      return 'https://www.shutterstock.com/image-photo/blue-book-isolated-on-white-600nw-2179864007.jpg';
    case 'Magazine':
      return 'https://unblast.com/wp-content/uploads/2020/03/Top-View-Magazine-Mockup-1.jpg';
    case 'DVD':
      return 'https://www.shutterstock.com/image-vector/vector-3d-realistic-opened-cd-600nw-1824116351.jpg';
    case 'Ebook':
      return 'https://d34mvw1if3ud0g.cloudfront.net/65282/Amazon-Kindle--2024-_20250418-053045_full.jpeg';
    default:
      return '/images/default.png';
  }
}
export default async function ResourcePage({ params } : any) {
 const awaitedParams = await params
  const resourceId = parseInt(awaitedParams.id, 10);

  if (isNaN(resourceId)) {
    notFound();
  }
  const resource = await getResourceById(resourceId);
  if (!resource) {
    notFound();
  }
  const imageSrc = getResourceImage(resource.resourceType);
  return (
    <div>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/3 p-4">
                <img src={imageSrc} alt={resource.title} className=" w-200 h-100 object-cover rounded-md" />
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 p-4">
    <div className="mt-3">
                    <span
        className={`px-3 py-2  text-sm font-bold ${
          resource.availableCopies
            ? ' dark:text-green-500'
            : ' dark:text-red-100'
        }`}
      >
        {resource.availableCopies ? 'A V A I L A B L E' : 'U N A V A I L A B L E'}
      </span>
                </div>
                <h2 className="text-5xl font-bold mt-5">{resource.title}</h2>
                                
                <p className="text-white text-xl font-medium my-5 mb-2">
                    <span className='text-gray-400'>From:</span> {resource.publisher}
                </p>
                <p className="text-white text-xl font-medium my-5 mb-2">
                    <span className='text-gray-400'>Published:</span> {resource.yearPublished ? new Date(resource.yearPublished).toLocaleDateString() : 'N/A'}
                </p>
                <p className="text-white text-xl font-medium my-5 mb-2">
                    <span className='text-gray-400'>Genres:</span> {resource.category?.name}
                </p>
                <p className="text-white text-xl font-medium my-5 mb-2">
                    <span className='text-gray-400'>Type:</span> {resource.resourceType}
                </p>

                {/* Buttons */}
                <div className="mt-4">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md">
                        GET ISSUED
                    </button>
                </div>

            </div>
        </div>
    </div>
  );
}