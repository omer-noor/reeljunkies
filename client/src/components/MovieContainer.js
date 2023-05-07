import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import SearchBar from './SearchBar';
import axios from 'axios';
const config = require('../config');
const apiKey = config.API_KEY

function MovieContainer() {
  const [movieData, setMovieData] = useState({ data: { results: [] } });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchMovieData() {
      console.log("HELLO");
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        );

        const moviesWithDirectors = await Promise.all(
          response.data.results.map(async (movie) => {
            const director = await fetchDirectorData(movie.id);
            return { ...movie, director };
          })
        );

        setMovieData({ ...response, data: { ...response.data, results: moviesWithDirectors } });
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchDirectorData(movieID) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`
        );

        const director = response.data.crew.find(({ job }) => job === "Director");
        return director ? director.name : "";
      } catch (error) {
        console.error(error);
        return "";
      }
    }

    if (searchQuery) {
      fetchMovieData();
    } else {
      setMovieData(null); // Reset the movieData state to null if there is no search query
    }
    }, [searchQuery]);


  function handleSearch(event, query) {
    event.preventDefault();
    setSearchQuery(query);
  }

  return (
    <div className='font-inter flex flex-col items-center p-6 rounded-lg text-white max-w-5xl mx-auto'>
      <SearchBar onChange={handleSearch} />
      {movieData && (
        <div>
          {movieData.data.results.map(movie => (
            <Movie key={movie.id} data={movie} director={movie.director} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieContainer;
