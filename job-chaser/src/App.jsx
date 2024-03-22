import React, { useState } from "react";
import axios from "axios";

function SearchBar({ inputValue, onInputChange, onSearchClick }) {
  return (
    <div className="flex justify-between border-2 gap-5 bg-blue-950 h-20 mb-10">
      <img className="object-contain w-96 py-4"
        src="https://arbetsformedlingen.se/webdav/files/logo/logo-vit.svg"
        alt=""
      />
      <div className="flex self-center h-10 pr-3">
        <input
          className="p-2 w-full rounded-s-lg"
          type="search"
          value={inputValue}
          onChange={onInputChange}
        />
        <button
          className="text-blue-950 bg-lime-400 p-2 rounded-e-lg"
          onClick={onSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

function SearchResults({ jobs, loading, error }) {
  const jobList = jobs.map((job) => (
    <li
      className="flex align-center mb-10 border-2 gap-2 h-40 bg-blue-900 text-white mx-12 rounded-3xl"
      key={job.id}
    >
      <div className="flex size-40 p-4 ">
        <img className="object-contain" src={job.logo_url} alt="" />
      </div>
      <div className="self-center">
        {job.headline}
        <br />
        {job.employer.workplace + " - " + job.workplace_address.municipality}
        <br />
        {job.occupation.label}
        <br />
        Publicerad {job.publication_date}
      </div>
    </li>
  ));
  console.log();
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
  const [inputValue, setInputValue] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jobsearch.api.jobtechdev.se/search?q=${inputValue}`
      );
      setJobs(response.data.hits);
      setError(null);
      console.log(response.data.hits);
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
    <div>
      <SearchBar
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSearchClick={handleSearchClick}
      />
      <SearchResults jobs={jobs} loading={loading} error={error} />
    </div>
  );
}

export default App;
