import React from 'react';
import Rating from './Rating';

function Movie(props) {
  props = props.data;
  console.log('Props are', props)
  const posterUrl = props.poster_path? props.poster_path: 'https://image.tmdb.org/t/p/original//vbLxDKfo8fYC8ISKKrJczNbGKLP.jpg' ;
  const name = props.title;
  const yearReleased = props.release_date;
  const rating = props.vote_average / 2;
  const directedBy = props.director;
  const description = props.overview;  
  const backgroundURL = props.backdrop_path ? `https://image.tmdb.org/t/p/original/${props.backdrop_path}` : 'https://image.tmdb.org/t/p/original//g03h9TULzJZOoXA34Abp5LE7lvt.jpg';
  console.log(backgroundURL);

  return (
    <div className="relative">
      <div className={`p-6 flex flex-row outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
         to-violet-600 mx-auto drop-shadow-2xl relative`}>
        <div className="basis-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original/${posterUrl}`}
            alt={name}
            className="Poster rounded-xl"
          />
        </div>
        <div className="basis-3/4 text-left -mt-4 p-4">
          <Name name={name} />
          <Year yearReleased={yearReleased} />
          <div className="w full">
            <Rating rating={rating} />
          </div>
          <DirectedBy directedBy={directedBy} />
          <Description description={description} />
        </div>
      </div>

    </div>
  );
}

function Name(props) {
  const { name } = props;

  return (
    <div className='mb-1'>
      <h2 className='text-4xl font-extrabold'>{name}</h2>
    </div>
  );
}

function Year(props) {
  const { yearReleased } = props;

  return (
    <div className='inline-block mb-1 bg-indigo-500 p-1 px-4 rounded-full'>
      <p>Released <span>{yearReleased}</span></p>
    </div>
  );
}

function DirectedBy(props) {
  const { directedBy } = props;

  return (
    <div>
      <p><span class="font-bold">Directed by:</span> <span className='inline-block mb-1 bg-fuchsia-500 p-1 px-4 rounded-full'>{directedBy}</span></p>
    </div>
  );
}

function Description(props) {
  const { description } = props;

  return (
    <div className='mt-5'>
      <p>{description}</p>
    </div>
  );
}

export default Movie;
