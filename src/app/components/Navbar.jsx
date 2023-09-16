"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
    <div className=' w-full fixed '>
      <div className='flex   md:px-10 px-3 pt-5  text-white font-bold'>
        <div className='flex relative'><span className='bg-red-600 absolute p-3  rounded-full w-10    '><PiTelevisionDuotone className='md:top-5 '/></span><p className='Md:ml-16 ml-12 md:text-2xl top-2 md:font-semibold font-normal'>MovieHub</p></div>



        <div className=''>
        <input
  type="search"
  placeholder=" what do you want to watch?"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className='rounded-lg bg-transparent border-solid border-2 md:px-4 md:py-2 md:w-full w-[80%] focus:outline-none focus:ring-2 focus:ring-white focus:border-white md:ml-52 ml-3'
/>
      <div className='relative'>
      <ul className='absolute z-50 md:justify-evenly  max-h-[400px] overflow-auto flex flex-col shadow-lg md:px-10 rounded-lg  bg-white md:ml-[44%] ml-4 text-black  md:w-full w-[80%] '>
        {result.map((movie) => (
          <li key={movie.id} className="flex items-center justify-start space-x-2 md:p-2 hover:bg-gray-100 cursor-pointer ">
            <Image
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              width={50}
              height={50}
              className='rounded-lg '/>
             <li className='md:ml-5 font-bold text-xs '> {movie.title}</li>
              <li className='md:ml-3 font-bold text-xs '>
            {movie.release_date}
          </li></li>
        ))}
      </ul>
    </div></div>

        <div className='md:ml-[400px]  flex md:space-x-20 relative'><p className='md:text-xl md:font-semibold ml-0 mr-3 font-normal'>SignIn</p> <span className='bg-red-600 absolute p-3 ml-12 rounded-full md:w-10 '><GiHamburgerMenu /></span></div>
    </div></div>
  )
}
