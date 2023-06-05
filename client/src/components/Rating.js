//src/components/Rating/Rating.js
import React from 'react';

function Rating({ rating,color }) {  
  const filledStars = Math.round(rating);  
  const emptyStars = 5 - filledStars;
  const bgColor = color||'bg-violet-500'

  console.log(rating,filledStars,emptyStars)

  return (
    <div className={`inline-flex items-center ${bgColor} p-1 px-4 rounded-full`}>
      {Array(filledStars)
        .fill()
        .map((_, index) => (
          <svg
            key={index}
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{index + 1} star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <svg
            key={index}
            aria-hidden="true"
            className="w-5 h-5 text-violet-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{index + 1 + filledStars} star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      <p className="ml-2 text-sm font-medium text-white">{`${filledStars}/5`}</p>
    </div>
  );
}

export default Rating;