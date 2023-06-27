import React from 'react';
import Rating from './Rating';
import { useAuth } from './AuthContext';

function SmallMovie(props: { data?: any; poster_path?: any; title?: any; id?: any; release_date?: any; vote_average?: any; director?: any; overview?: any; backdrop_path?: any; setMovie?: any; setIsSelected?: any; setUser?: any; }) {
  const { signOut, user } = useAuth()!;
  const {setMovie,setIsSelected,setUser} = props;
  props = props.data;
  console.log('Props are', props)
  const posterUrl = props.poster_path? props.poster_path: 'https://image.tmdb.org/t/p/original//vbLxDKfo8fYC8ISKKrJczNbGKLP.jpg' ;
  const name = props.title;
  const id = props.id;
  const yearReleased = props.release_date;
  const rating = props.vote_average / 2;
  const directedBy = props.director || "Not found";
  const description = props.overview;  
  const backgroundURL = props.backdrop_path ? `https://image.tmdb.org/t/p/original/${props.backdrop_path}` : 'https://image.tmdb.org/t/p/original//g03h9TULzJZOoXA34Abp5LE7lvt.jpg';
  

  const submitMovie = async (e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    try{
      console.log(id)
      setMovie({ id: id, title: name, director: directedBy });
      setUser(user);
      setIsSelected(true)
      console.log("HERE")
    }
    catch (error){
      console.log(error)
    }    
  }

  return (
    <div className="relative">
      <div className={`p-6 flex flex-row mt-5 rounded-xl bg-gradient-to-r from-violet-600
         to-indigo-800 mx-auto drop-shadow-2xl relative`}>
        <div className="basis-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original/${posterUrl}`}
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
          <SelectMovie submitMovie={submitMovie}/>   
        </div>        
        </div>
      </div>

    </div>
  );
}

function Name(props: { name: any; }) {
  const { name } = props;

  return (
    <div className='mb-1'>
      <h2 className='text-xl font-extrabold'>{name}</h2>
    </div>
  );
}

function Year(props: { yearReleased: any; }) {
  const { yearReleased } = props;

  return (
    <div className='inline-block text-sm mb-1 bg-indigo-500 p-1 px-4 rounded-full'>
      <p>Released <span>{yearReleased}</span></p>
    </div>
  );
}

function DirectedBy(props: { directedBy: any; }) {
  const { directedBy } = props;

  return (
    <div>
      <p><span className="font-bold text-sm">Directed by:</span> <span className='inline-block mb-1 text-sm bg-fuchsia-500 p-1 px-4 rounded-full'>{directedBy}</span></p>
    </div>
  );
}

function SelectMovie(props: { submitMovie: React.MouseEventHandler<HTMLButtonElement> | undefined; }) {
  return (
    <div className='-mr-5 mt-4 -mb-4'>
      <button onClick={props.submitMovie} className="px-4 py-2 font-semibold text-sm bg-emerald-600 text-white rounded-sm shadow-sm ">+ Review</button>
    </div>
  );
}

export default SmallMovie;
