import React from 'react';

function Movie(props) {
  props = props.data;
  console.log('Props are', props)
  const posterUrl = props.poster_path;
  const name = props.title;
  const yearReleased = props.release_date;
  const rating = props.vote_average;
  const directedBy = "test"
  const description = props.overview;

  //const { posterUrl, name, yearReleased, rating, directedBy, description } = props;

  return (
    <div className='p-6 flex flex-row mt-5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 mx-auto font-montserrat'>
      <div className='basis-1/3'>
        <img src={`https://image.tmdb.org/t/p/original/${posterUrl}`} alt={name} className="Poster rounded-xl" />
      </div>
      <div className='basis-2/3 text-left -mt-4 p-4'>
        <NameAndYear name={name} yearReleased={yearReleased} />
        <Rating rating={rating} />
        <DirectedBy directedBy={directedBy} />
        <Description description={description} />
      </div>
    </div>
  );
}

function NameAndYear(props) {
  const { name, yearReleased } = props;

  return (
    <div className='mb-3'>
      <h2 className='text-4xl font-extrabold'>{name}</h2>
      <p className='italic'>Released {yearReleased}</p>
    </div>
  );
}

function Rating(props) {
  const { rating } = props;

  return (
    <div>
      <p>{rating} stars</p>
    </div>
  );
}

function DirectedBy(props) {
  const { directedBy } = props;

  return (
    <div>
      <p><span class="font-bold">Directed by:</span> {directedBy}</p>
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
