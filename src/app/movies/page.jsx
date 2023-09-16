"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Movies() {
  const [allDetails, setAllDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      const apiKey = '7aad8019e55d0da1feb3637f13d515c1';
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=all`
      );
      const data = await response.json();
      setFilteredDetails(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

 

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="bg-cyan-950 grid grid-cols-2 mt-20 px-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {filteredDetails.map((movie) => (
          <section
            key={movie.id}
            className="text-left px-10 py-5 shadow-xl text-xl mt-5 mb-8 shadow-black rounded-lg bg-cyan-500"
          >
            <Link href={`/movies/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={200}
                />
            </Link>
            <p>{movie.title}</p>
          </section>
        ))}
      </div>
     
    </div>
  );
}


