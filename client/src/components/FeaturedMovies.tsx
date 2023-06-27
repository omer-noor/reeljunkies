import React, { useState, useEffect } from 'react';
import VerticalMovie from './VerticalMovie';
import SearchBar from './SearchBar';
import axios from 'axios';
import { IMovie } from '../../../models/movie';
const config = require('../config');
const apiKey = config.API_KEY


function FeaturedMovies() {
  const [movieData, setMovieData] = useState({ data: { results: [] } });

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        console.log(JSON.stringify(response.data.results, null, 2)+"resul");
        const moviesWithDirectors = await Promise.all(
          response.data.results.map(async (movie:any) => {
            const director = await fetchDirectorData(movie.id);
            return { ...movie, director };
          })
        );

        setMovieData({ ...response, data: { ...response.data, results: moviesWithDirectors } });
      } catch (error) {
        console.error(error);
      }
    }   

    async function fetchDirectorData(movieID:string) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`
        );

        const director = response.data.crew.find(({job}:{job:string}) => job === "Director");
        console.log(director+"DIRECTPR");
        return director ? director.name : "";
      } catch (error) {
        console.error(error);
        return "";
      }
    }
    fetchMovieData();
  }, []);

  return (
    <div className='font-inter p-6 rounded-lg text-white mx-60'>
      <h1 className='text-lg -mb-4'>trending movies this week</h1>
      {movieData && (
        <div className='flex flex-row gap-6'>
          {movieData.data.results.slice(0, 5).map((movie:IMovie) => (
            <VerticalMovie key={movie._id} data={movie} director={movie.director} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedMovies;
