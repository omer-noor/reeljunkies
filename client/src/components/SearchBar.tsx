import React from 'react';

function SearchBar(props: { onChange: (arg0: any, arg1: any) => void; placeholder: any; }) {
  function handleChange(event: { target: { value: any; }; }) {
    const value = event.target.value;
    console.log('SearchBar value:', value);
    props.onChange(event, value);
  }

  return (
    <form className="w-full max-w-2xl min-w-full"> {/* Adjust this width to suit your design */}
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
          onChange={handleChange} 
          type="search" 
          id="default-search" 
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 
            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder={`${props.placeholder}`} 
          required />
      </div>
    </form>
  );
}


export default SearchBar;
