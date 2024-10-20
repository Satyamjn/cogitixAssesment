import React, { useState, useEffect } from "react";

function EpisodeList({ onEpisodeSelect }) {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = () => {
    fetch("https://rickandmortyapi.com/api/episode")
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data.results);
        setSelectedEpisode(data.results[0]); // Default to first episode
        onEpisodeSelect(data.results[0]); // Load characters for the first episode on page load
      })
      .catch((error) => console.error("Error fetching episodes:", error));
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode); 
    onEpisodeSelect(episode); 
  };

  return (
    <div className="w-1/4 bg-gray-900 text-white h-screen sticky top-0 flex flex-col">
      <h2 className="text-xl font-bold mb-6 pl-4">Episodes</h2>{" "}
      <ul className="flex-1 overflow-y-auto space-y-4 px-4">
        {" "}
        {/* Scrollable list inside a fixed sidebar */}
        {episodes.map((episode) => (
          <li
            key={episode.id}
            onClick={() => handleEpisodeClick(episode)}
            className={`py-2 rounded-lg cursor-pointer flex items-center transition-colors duration-200 ease-in-out 
              ${
                selectedEpisode && selectedEpisode.id === episode.id
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
          >
            <span className="text-sm">{episode.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeList;
