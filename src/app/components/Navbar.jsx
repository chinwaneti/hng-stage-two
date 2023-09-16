"use client"
import React, { useEffect, useState } from 'react';
import {PiTelevisionDuotone} from "react-icons/pi"
import {GiHamburgerMenu} from "react-icons/gi"
import Image from 'next/image';


export default function Navbar() {

  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3def9133164838ebfab4e3e0f0062aa4&query=${search}`); 

        const data = await response.json();
        setResult(data.results); 
      } catch (error) {
        console.error('not found', error);
        throw error;
      }
    };

    if (search) {
      fetchMovies();
    } else {
      setResult([]);
    }
  }, [search]);
  return (
    <div className=' w-full '>
      <div className='flex   px-10 pt-5 text-white font-bold'>
        <div className='flex relative'><span className='bg-red-600 absolute p-3  rounded-full w-10    '><PiTelevisionDuotone /></span><p className='ml-16 text-2xl font-semibold'>MovieHub</p></div>
        <div className=''>
        <input
  type="search"
  placeholder=" what do you want to watch?"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className='rounded-lg bg-transparent border-solid border-2 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white focus:border-white ml-52 '
/>
      <div className='relative'>
      <ul className='absolute z-50 justify-evenly  max-h-[400px] overflow-auto flex flex-col shadow-lg px-10 rounded-lg  bg-white ml-[44%] text-black  w-full '>
        {result.map((movie) => (
          <li key={movie.id} className="flex items-center justify-start space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
            <Image
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              width={50}
              height={50}
              className='rounded-lg'/>
             <li className='ml-5'> {movie.title}</li>
              <li className='ml-3'>
            {movie.release_date}
          </li></li>
        ))}
      </ul>
    </div></div>
        <div className='ml-[400px] flex space-x-20 relative'><p className='text-xl font-semibold'>Sign-In</p> <span className='bg-red-600 absolute p-3  rounded-full w-10 '><GiHamburgerMenu /></span></div>
    </div></div>
  )
}
