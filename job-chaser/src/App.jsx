import { useState } from "react";
import "./App.css";
import { jobs } from "./data.js";

function App() {
  function SearchBar() {
    return (
      <div>
        <input type="search" />
        <button>Search</button>
      </div>
    );
  }
  function SearchResults() {
    const jobList = jobs.map((job) => (
      <li>{job.company + " - " + job.position}</li>
    ));
    return (
      <div>
        <ul>{jobList}</ul>
      </div>
    );
  }
  return (
    <div>
      <SearchBar />
      <SearchResults />
    </div>
  );
}

export default App;
