import React from "react";
import { useState } from "react";
import EpisodeList from "./componets/EpisodeListComponent";
import CharacterList from "./componets/CharacterListComponent";
CharacterList;
const App = () => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
  };
  return (
    <div className="flex h-screen">
      <EpisodeList onEpisodeSelect={handleEpisodeSelect} />

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {" "}
        {selectedEpisode ? (
          <CharacterList episode={selectedEpisode} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default App;
