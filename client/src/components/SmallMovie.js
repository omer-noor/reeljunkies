import React from 'react';
import Rating from './Rating';

function SmallMovie(props) {
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
      <div className={`p-6 flex flex-row mt-5 rounded-xl bg-gradient-to-r from-violet-600
         to-indigo-800 mx-auto drop-shadow-2xl relative`}>
        <div className="basis-1/4">
          <img
            src={'https://media.tenor.com/ByHfwBHRhkIAAAAd/frog-frog-laughing.gif'}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="basis-3/4 text-left -mt-4 p-4">
          <Name name={name} />
          <Year yearReleased={yearReleased} />
          <div className="w full">
            <Rating rating={rating} />
          </div>
          <DirectedBy directedBy={directedBy} />  
          <div className='mt-5 flex justify-end'> {/* apply flex and justify-end here */}
          <SelectMovie/>   
        </div>        
        </div>
      </div>

    </div>
  );
}

function Name(props) {
  const { name } = props;

  return (
    <div className='mb-1'>
      <h2 className='text-xl font-extrabold'>{name}</h2>
    </div>
  );
}

function Year(props) {
  const { yearReleased } = props;

  return (
    <div className='inline-block text-sm mb-1 bg-indigo-500 p-1 px-4 rounded-full'>
      <p>Released <span>{yearReleased}</span></p>
    </div>
  );
}

function DirectedBy(props) {
  const { directedBy } = props;

  return (
    <div>
      <p><span class="font-bold text-sm">Directed by:</span> <span className='inline-block mb-1 text-sm bg-fuchsia-500 p-1 px-4 rounded-full'>{directedBy}</span></p>
    </div>
  );
}

function SelectMovie(props) {
  return (
    <div className='-mr-5 mt-4 -mb-4'>
      <button class="px-4 py-2 font-semibold text-sm bg-emerald-600 text-white rounded-sm shadow-sm ">+ Review</button>
    </div>
  );
}

export default SmallMovie;
