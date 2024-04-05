import React from 'react';
import Errrorimg from "../assets/Errorimg.png"

export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-4">
        We're sorry, but the page you're looking for cannot be found. It might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Here are a few things you can try:
      </p>
      <ul className="text-lg text-gray-700 mb-4 list-disc list-inside">
        <li>Check the URL for any typos or errors.</li>
        <li>Go back to the previous page and try again.</li>
        <li>Contact our support team for assistance.</li>
      </ul>
    </div>
  );
}

export default Error;
