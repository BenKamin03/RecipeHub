import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 bg-white rounded-lg flex flex-col justify-center content-center">
        <h1 className="text-3xl text-center font-bold mb-4">Loading...</h1>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 m-auto border-gray-900"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
