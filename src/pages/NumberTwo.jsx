import React, { useState, useEffect } from "react";
import axios from "axios";

function App(){
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  function fetchRepos() {
    setError("");
    setRepos([]);
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(function (response) {
        const sortedRepos = response.data
          .sort(function (a, b) {
            return b.stars_count - a.stars_count;
          })
          .slice(0, 10);
        setRepos(sortedRepos);
      })
      .catch(function (err) {
        if (err.response && err.response.status == 404) {
          setError("Foydalanuvchi topilmadi");
        } else {
          setError("Ma'lumot yuklashda xatolik yuz berdi");
        }
      });
  }

  useEffect(function () {
    if (username) {
      fetchRepos();
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">GitHub Repozitoriyalari</h1>
      <input
        type="text"
        placeholder="GitHub username kiriting"
        value={username}
        onChange={function (e) {
          setUsername(e.target.value);
        }}
        className="border rounded px-4 py-2 w-full max-w-md mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="w-full max-w-md">
        {repos.length > 0 && (
          <ul className="bg-white shadow-md rounded-md p-4">
            {repos.map(function (repo) {
              return (
                <li key={repo.id} className="mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {repo.name}
                  </a>
                  <span className="text-gray-600"> - ⭐ {repo.stars_count}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;