import React from "react";

function Itemcard({ itemProps }: { itemProps: any }) {
  const { imageUrl, title, rating, type, link } = itemProps;

  return (
    <div className="w-65 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href={link}>
        <div className="w-full h-60 overflow-hidden">
          <img
            className="p-4 rounded-t-lg h-auto w-full"
            src={imageUrl}
            alt={title}
          />
        </div>
      </a>
      <div className="px-5 pb-5">
        <a href={link}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-2">
          <span className="text-md text-gray-900 dark:text-white">
            Type: {type}
          </span>
        </div>
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center space-x-1 rtl:space-x-reverse">
            Rating:
          </div> */}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            Rating: {rating}
          </span>
          <a
            href={link}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Itemcard;
