// components/MovieDetails.js
import React from 'react';

function MovieDetails({ movie, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 shadow-md rounded-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-sm text-gray-600">Release Date: {movie.release_date}</p>
        <p className="text-gray-700">{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
