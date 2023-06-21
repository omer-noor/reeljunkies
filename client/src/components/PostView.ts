import React, { useState, useEffect } from 'react';
import Rating from './Rating';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserButton from './UserButton'
const config = require('../config');
const apiKey = config.API_KEY


function PostView(props) {
  const navigate = useNavigate(); 
  props = props.data;
  console.log(props,"PREEsPS")
  const user = props.user
  const movie = props.movie;
  const title = props.title;
  const content = props.content;
  const rating = props.rating;
  const createdAt = new Date(props.createdAt).toDateString();

  const [movieData, setMovieData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  

  useEffect(() => {
    async function fetchMovieData(movieID) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`
        );
        setMovieData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
        setIsLoading(false);
      }
    }

    fetchMovieData(movie.id);
  }, [movie.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError || !movieData) {
    return <div>Error loading movie data.</div>;
  }

  return (
    <div className="relative">
      <div className={`pt-6 px-6 flex flex-row outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
         to-violet-600 mx-auto drop-shadow-2xl relative`}>
        <div className="basis-1/4">
          {movieData && <img
            src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
            alt={movieData.title}
            className="object-cover rounded-xl"
          />}
        </div>
        <div className="basis-3/4 text-left -mt-4 p-6 flex flex-col justify-between">
          <div>
            <div className='flex flex-row items-center justify-between'>
              <MovieInfo movie={movieData} />
              <Rating rating={rating} color="emerald-500" />
            </div>
            <Title title={title} />
            <CreatedAt createdAt={createdAt} />
            <Content content={content} />
          </div>
          <ReviewedBy user={user} />
        </div>
      </div>
    </div>
  );
}

function Content(props) {
  const { content } = props;

  return (
    <div className='mt-5 p-4 bg-indigo-500/25 rounded-xl mb-10 overflow-auto h-40 w-full -mb-1'>
      <p>{content}</p>
    </div>
  );
}


function Title(props) {
  const { title } = props;

  return (
    <div className='mb-1'>
      <h2 className='text-2xl'>"{title}"</h2>
    </div>
  );
}

function MovieInfo(props) {
  const { movie } = props;

  if (!movie || !movie.title) {
    return <div>No movie information available</div>;
  }

  return (
    <div className='mb-1'>
      <p>Review for</p>
      <h2 className='text-xl font-extrabold'>{movie.title}</h2>
    </div>
  );
}

function CreatedAt(props) {
  const { createdAt } = props;

  return (
    <div className='inline-block mb-1 text-sm bg-indigo-500 p-1 px-4 rounded-full'>
      <p><span>{createdAt}</span></p>
    </div>
  );
}

function ReviewedBy(props) {  
  const user=props.user
  return (
    <div className='inline-block mt-4'>
      <p>Reviewed by<UserButton user={user}/></p>
    </div>
  );
}



export default PostView;
