import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
    const navigate = useNavigate();
    console.log(props,"PROPS")
    const user = props.user
    const navigateToUser = (e) => {
        e.preventDefault();
        navigate(`/user/${user._id}`);
    }

    return (
        <button className='bg-indigo-500 p-1 px-4 rounded-full' onClick={navigateToUser}>{user.username}</button>
    );
}


export default SearchBar;

