import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ inputValue, onInputChange, onSearchClick }) {
  return (
    <div className='flex justify-between border-2 gap-5'>
      <img src="https://arbetsformedlingen.se/webdav/files/logo/logo.svg" alt="" />
      <div className='flex align-center w-96'>
        <input className='border-2 w-full' type="search" value={inputValue} onChange={onInputChange} />
        <button className='border-2' onClick={onSearchClick}>Search</button>
      </div>
    </div>
  );
}

function SearchResults({ jobs, loading, error }) {
  const jobList = jobs.map((job) => (
    <li className="flex align-center mb-10 border-2  gap-2 h-40 bg-blue-900 text-white" key={job.id}>
      <div className='flex size-40 p-4'>
        <img className="object-contain" src={job.logo_url} alt="" />
      </div>
      <h2 className='self-center'>{job.headline}</h2>
    </li>
  ));
  return (
    <div>
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error fetching jobs: {error.message}</p>}
      <ul>{jobList}</ul>
    </div>
  );
}

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jobsearch.api.jobtechdev.se/search?q=${inputValue}`);
      setJobs(response.data.hits);
      setError(null);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSearchClick() {
    fetchJobs();
  }

  return (
    <div className='p-4'>
      <SearchBar 
        inputValue={inputValue} 
        onInputChange={handleInputChange} 
        onSearchClick={handleSearchClick} />
      <SearchResults 
        jobs={jobs} 
        loading={loading} 
        error={error} />
    </div>
  );
}

export default App;
