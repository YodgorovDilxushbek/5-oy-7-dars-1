import axios from 'axios';
import React, { useState } from 'react';

const NumberTwo = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  const [notFoundUsername, setNotFoundUsername] = useState(false);
  function handleSearch(event) {
    event.preventDefault();


    if (username.trim()) {
      setNotFoundUsername(false);

      axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            if (response.data.length === 0) {
              setNotFoundUsername(true);
            } else {
              setData(response.data);
            }
          }
        })
        .catch(er => {
          setNotFoundUsername(true);
          console.log(er);
        });
    } else {
      setNotFoundUsername(true);
    }
  }

  return (
    <div className="max-w-[1100px] w-full mx-auto py-12 flex flex-col justify-center items-center gap-8">
      <h1 className="text-[30px] font-bold text-blue-600"> Git Hub </h1>

      <form className="flex gap-4 bg-blue-500 max-w-[350px] w-full rounded-md shadow-lg">
        <input
          className="w-full px-4 py-2 border-[2px] border-blue-300 rounded-md focus:outline-none focus:border-blue-600"
          onChange={(e) => { setUsername(e.target.value); }}
          type="text"
          placeholder="Enter your GitHub username.."
        />
        <button
          className="pr-4 pl-4 text-center text-white bg-blue-700 rounded-md hover:bg-blue-600 transition-all duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>

      <p className="text-[18px] mt-4 text-red-500 font-medium">
        {notFoundUsername ? 'GitHub username topilmadi' : ''}
      </p>

      <div className="mt-8 w-full max-w-[800px] flex flex-col gap-8">
        {data.length > 0 ? (
          data.map((value, index) => (
            <div
              key={index}
              className="border-2 border-gray-300 rounded-lg p-6 flex items-center gap-6 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <img
                src={value.owner.avatar_url}
                alt={`${value.name} Avatar`}
                className="w-[60px] h-[60px] rounded-full object-cover"
              />
              <div className="text-gray-800">
                <p className="text-lg font-bold">Repo Name: <span className="font-normal">{value.name}</span></p>
                <p className="flex items-center gap-2 text-sm">
                  <strong>Star:</strong>
                  <span className="text-yellow-400">{value.stargazers_count}</span>
                </p>
                <p className="text-sm">
                  <strong>Vercel link:</strong>
                  <a
                    href={value.homepage || '#'}
                    className={`text-blue-500 underline ${value.homepage ? '' : 'pointer-events-none opacity-50'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {value.homepage || 'No link available'}
                  </a>
                </p>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>

  );
};

export default NumberTwo;
