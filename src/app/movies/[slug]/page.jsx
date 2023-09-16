"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaTv, FaHome, FaFilm, FaCalendarAlt, FaSignOutAlt, FaYoutube } from 'react-icons/fa';

export default function Page({ params }) {
  const { slug } = params;
  const [details, setDetails] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiKey = '3def9133164838ebfab4e3e0f0062aa4';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${slug}?api_key=${apiKey}&append_to_response=videos`
        );
        const data = response.data;
        console.log('Fetched data:', data);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [slug]);

  const handleMovieClick = () => {
    if (!details || !details.videos || details.videos.results.length === 0) {
      // Handle the case where there are no videos available
      console.log('No videos available for this movie');
    } else {
      const trailerKey = details.videos.results[0].key;
      // Set showVideo to true to render the embedded video
      setShowVideo(true);
    }
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  // Convert runtime to minutes
  const runtimeInMinutes = details.runtime;

  // Format release date in UTC
  const releaseDate = new Date(details.release_date).toUTCString();

  return (
    <div className="flex md:flex-row  rounded-md md:w-full  items-center md:items-start">
      <div className="relative flex space-x-2 h-full md:px-6 px-2 py-3">
        <div className="hidden md:block">
          <div className="rounded-r-3xl h-full px-3 border-2 items-center">
            <div className="my-10 flex space-x-3">
              <FaTv size={24} data-testid="tv-icon" />
              <span>TV</span>
            </div>
            <Link href="/">
              <div className="my-10 flex space-x-3">
                <FaHome size={24} data-testid="home-icon" />
                <span>Home</span>
              </div>
            </Link>
            <div className="my-10 flex space-x-3">
              <FaFilm size={24} data-testid="movies-icon" />
              <span>Movies</span>
            </div>
            <div className="my-10 flex space-x-3">
              <FaCalendarAlt size={24} data-testid="calendar-icon" />
              <span>Upcoming</span>
            </div>
            <div className="bg-pink-100 rounded-2xl text-xs w-32 p-4">
              <p>
                Play movie quizzes and earn free tickets
                50k people are playing now
              </p>
              <button className="text-xs text-pink-500 bg-pink-300 rounded-full p-2 my-3">
                Start playing
              </button>
            </div>
            <div className="my-10 flex space-x-3">
              <FaSignOutAlt size={24} data-testid="logout-icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
         
          {showVideo ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${details.videos.results[0].key}`}
              allowFullScreen
              className="md:w-[100%] w-[100%] md:h-[70vh] h-[70vh] rounded-3xl md:ml-2 ml-0"
            ></iframe>
          ) : (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${details.videos.results[0].key}`}
              allowFullScreen
              className="md:w-[100%] w-[100%] md:h-[70vh] h-[80vh] rounded-3xl md:ml-2 ml-0"
              data-testid="video-iframe"
            ></iframe>
          )}

          <div className="mt-5">
            <h1 className="text-xl flex-row flex space-x-3 my-5 font-bold">
             <p className=''>{details.title}</p> 
              <ul className="flex ml-3 space-x-3 font-bold text-sm">
                    <ol className="flex space-x-3">
              <li>
                <span className="md:font-bold" data-testid="runtime-label"> </span> {runtimeInMinutes} minutes
              </li>
              <li>
                <span className="md:font-bold " data-testid="release-date-label"></span> {releaseDate}
              </li>
            </ol>
                {details.genres.map((genre) => (
                  <li
                    key={genre.id}

                  >
                  <p className="rounded-full border-2 p-1 text-xs"
                    data-testid="genre-item">  {genre.name}</p>
                  </li>
                ))}
              </ul>
            </h1>
            <p className="font-semibold text-sm text-black/70 mb-4" data-testid="movie-overview">
              {details.overview}
            </p>
            
          
          </div>
        </div>
      </div>
    </div>
  );
}




