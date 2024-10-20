import React, { useState, useEffect } from "react";

function CharacterList({ episode }) {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [characterCount, setCharacterCount] = useState(0); 

  useEffect(() => {
    if (episode) {
      fetchCharactersFromEpisode(episode);
    }
  }, [episode, currentPage]);

  const fetchCharactersFromEpisode = async (episode) => {
    // Extract character URLs from the episode
    const characterUrls = episode.characters;

    // Update character count
    setCharacterCount(characterUrls.length);

    const charactersPerPage = 20; // Number of characters to display per page
    const paginatedCharacterUrls = characterUrls.slice(
      (currentPage - 1) * charactersPerPage,
      currentPage * charactersPerPage
    );

    try {
      const characterPromises = paginatedCharacterUrls.map((url) =>
        fetch(url).then((res) => res.json())
      );
      const charactersData = await Promise.all(characterPromises);

      setCharacters(charactersData);
      setTotalPages(Math.ceil(characterUrls.length / charactersPerPage)); // Calculate total pages for pagination
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center mt-6 mb-8">
        Rick and Morty Characters
      </h1>

      {/* Display character count */}
      <h2 className="text-2xl font-bold mb-4">
        {characterCount} Characters in episode "{episode.name}"
      </h2>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id} className="bg-white p-4 rounded shadow-md">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto rounded-md"
              />
              <h3 className="text-center mt-2 font-semibold">
                {character.name}
              </h3>
            </div>
          ))
        ) : (
          <p>No characters available.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-4 py-2 border rounded ${
                page === currentPage ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default CharacterList;
