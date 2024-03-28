import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "./firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function SignInModal({ isOpen, toggleModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signIn");

  const handleSignIn = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    console.log("Attempting to sign in with email:", trimmedEmail);

    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
      console.log("User signed in successfully.");
      toggleModal();
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created successfully:", userCredential);
      toggleModal();
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleSubmit = mode === "signIn" ? handleSignIn : handleSignUp;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-50 rounded-lg shadow p-6 space-y-4 md:space-y-6 sm:p-8 relative">
        <button onClick={toggleModal} className="absolute top-0 right-0 m-4">
          Close
        </button>
        <section className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@email.com"
                      required=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-lime-400 p-2 rounded-lg w-full mt-2"
                    >
                      {mode === "signIn" ? "Sign In" : "Sign Up"}
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      
                      type="button"
                      onClick={() =>
                        setMode(mode === "signIn" ? "signUp" : "signIn")
                      }
                    >
                      {mode === "signIn"
                        ? "New user? Sign up"
                        : "Have an account? Sign In"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SearchBar({
  inputValue,
  onInputChange,
  onSearchClick,
  isLoggedIn,
  onSignInClick,
  onSignOutClick,
}) {
  return (
    <div className="flex justify-between border-2 gap-5 bg-blue-950 h-20 mb-10">
      <img
        className="object-contain w-96 py-4"
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
        {!isLoggedIn ? (
          <button
            onClick={onSignInClick}
            className="self-center mr-2 text-blue-950 bg-lime-400 p-2 rounded-lg w-32 ml-6"
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={onSignOutClick}
            className="self-center mr-2 text-blue-950 bg-lime-400 p-2 rounded-lg w-32 ml-6"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}

function SearchResults({ jobs, loading, error }) {
  const jobList = jobs.map((job) => (
    <li
      className="flex align-center border-2 gap-2 h-40 bg-blue-950 text-white mx-12 rounded-3xl pl-4 m-3"
      key={job.id}
    >
      <div className="flex size-24 bg-white rounded-full self-center mx-4">
        <img className="object-contain p-4" src={job.logo_url} alt="" />
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
      <ul className="">{jobList}</ul>
    </div>
  );
}

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

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

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      setIsModalOpen(false); // Optionally close the modal, if it's open
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      <SearchBar
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSearchClick={handleSearchClick}
        isLoggedIn={isLoggedIn}
        onSignInClick={toggleModal}
        onSignOutClick={handleSignOut}
      />
      <SignInModal isOpen={isModalOpen} toggleModal={toggleModal} />
      <SearchResults jobs={jobs} loading={loading} error={error} />
    </div>
  );
}

export default App;
