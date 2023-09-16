"use client"
import React, { useEffect, useState } from 'react';
import { FaPlay, FaStar } from 'react-icons/fa';
import { AiFillHeart, AiFillPlayCircle } from 'react-icons/ai';
import { GrFormNext } from 'react-icons/gr';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Link from 'next/link';
import Footer from './components/Footer';
import axios from 'axios';

async function fetchMovieData() {
  try {
    const apiKey = '3def9133164838ebfab4e3e0f0062aa4'; 
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    throw error;
  }
}

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isFavorited, setIsFavorited] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const movieData = await fetchMovieData();
        setMovies(movieData);
        setIsFavorited(new Array(movieData.length).fill(false));
      } catch (error) {
        console.error('Error in MovieList component:', error);
        setError('Failed to fetch movie data. Please try again later.');
      }
    }

    fetchData();
  }, []);

  const toggleFavorite = (index) => {
    const updatedIsFavorited = [...isFavorited];
    updatedIsFavorited[index] = !isFavorited[index];
    setIsFavorited(updatedIsFavorited);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 text-center mt-32 text-2xl font-bold" data-testid="error-message">
          {error}
        </div>
      )}

      <section className="relative">
        <div className="absolute z-50">
          <Navbar />
        </div>
        <div>
          {movies.slice(6, 7).map((movie, index) => (
            <div key={movie.id} className="w-full h-full" data-testid={`movie-card-${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={500}
                priority
                className="w-[100%] h-screen"
                data-testid={`movie-poster-${movie.id}`}
              />
              <div className="absolute top-[40%]  px-10 text-white">
                <div className="font-bold md:text-7xl text-4xl w-full " data-testid={`movie-title-${movie.id}`}>
                  {movie.title}
                </div>
                <div className="flex mt-5">
                  <Image
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ9SURBVHgB7ZVLSFRRGMf/3znjzPExzVgEaQ9Eo8TKNCyh7EFt2kWLNm0SLFwqIYEQoj2gB1nTLoKIssBFLSNqFwltGh9ZmCDOpshMGNO58/KerzMjPZwctcnZ+YOB+Z7/797v3nsI6bhZ4hXC00Zs++3mwS5kiCNtxM4rBqGRWQwZqwu+yiOC+SogiozdqZv7byAjgdubXdC5tdCsQOwznlbh23EODNOcAGaQ5C9YIjTHurWzTgDdpktxugIGAqRx15SaK9GftKQ+NA08X1yg/ZBDeCY6QaTMkHuJsA1LJ6Bn+BRa3r1KL5DgeuV2ysE146wzljs12ewAmn6XVEzGcDwwhYpgFOtDM/Hab5HLLn+k42+BK6UeofJbjHn+z2DjUBB3yr2/7OEnoxgtcEByonkUhVGNeSZ+HYvIEwUfQsk9zS5ZFXpaBseOBtw5+Kokiiwbp4cnsXs8jPtbPIgKwv4xCxtD8eRvIYx2nVPpZ+NbcXDtR0wlBWIP3h82gZrU5Idlq+C0GSdHvqN1YAJLhcHV7jzXJSDaRFYlNkiH6jH+TamJM2Zyh2ZkirmBB4SU6sx8zRP8T/MEktBAkV1qxCymFFmBgyJ7zROQVyDLrAgsCIGnhXkSe5A16I2Qgh8jS9gaj4ir4I2TGmHCaiwnjIDzWKRMmOMiCKYLWGZYcCO1QyeX7OwL+8wuLmKZMB+7s+pt9EXi/5wDJ1yt2syr3YFMYQ6CRIPLH37600WpOVZN7h5pc7eJlOAfIMbLOER9fq/1eY4/XUG4StVLgQaePT7TTswkuoRN95z9Vu+8wlgELnevsXJj+3II64i50CYKsaZpIaTf5Q8NLFb/A2064VNB8O3fAAAAAElFTkSuQmCC"
                    alt="dinma"
                    height={20}
                    width={20}
                    data-testid={`movie-icon-${movie.id}`}
                  />
                  <p className="ml-3" data-testid={`movie-vote-${movie.id}`}>
                    {movie.vote_average}
                  </p>
                </div>
                <div className="md:w-[40%] my-5" data-testid={`movie-overview-${movie.id}`}>
                  {movie.overview}
                </div>
                <button
                  className="flex space-x-3 bg-red-600 p-2 px-4 rounded-xl"
                  data-testid={`watch-trailer-button-${movie.id}`}
                >
                  <AiFillPlayCircle size={20} style={{ color: 'white' }} className="" />
                  <p>Watch Trailer</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="flex justify-between pt-10 px-16 ">
        <p className="font-bold">Featured Movies</p>
        <p className="flex space-x-4">
          see more <span><GrFormNext size={25} /></span>
        </p>
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-10 p-3">
        {movies.slice(0, 12).map((movie, index) => (
          <div
            key={movie.id}
            
            className="bg-white p-4 hover:shadow-xl hover:border-2 shadow-md"
            
            data-testid={`featured-movie-${movie.id}`}
          >
            <div className="relative mb-4">
              <Link href={`/movies/${movie.id}`} title={`More on ${movie.title}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  priority
                  data-testid={`featured-movie-poster-${movie.id}`}
                />
              </Link>
              <button onClick={() => toggleFavorite(index)}>
                <AiFillHeart
                  size={30}
                  className="absolute top-2 right-3 bg-gray-50 rounded-full p-1 border-2"
                  style={{ color: isFavorited[index] ? 'red' : 'gainsboro' }}
                  data-testid={`favorite-button-${movie.id}`}
                />
              </button>
              <div>
                <span className='font-bold' data-testid={`featured-movie-title-${movie.id}`}>Title: </span>
                {movie.title}
              </div>
              <div className='flex justify-between' data-testid={`featured-movie-date-${movie.id}`}>
                <span className='font-bold'>Date:</span> {movie.release_date}
              </div>
              <div className='flex justify-end'>
                <FaStar size={20} style={{ color: "red" }} className='mr-2' />
                <span data-testid={`featured-movie-vote-${movie.id}`}>{movie.vote_average}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MovieList;
