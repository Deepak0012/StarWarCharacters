import React from 'react';
import './CharacterGrid.css';

interface Character {
  name: string;
  gender: string;
  url: string;
}

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
  return (
    <div className="character-grid">
      {characters.map((char) => (
        <div key={char.url} className="character-card">
          <a href={`/character/${char.url.split('/').slice(-2, -1)[0]}`} className="character-link">
            <h2>{char.name}</h2>
            <p><strong>Gender:</strong> {char.gender}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CharacterGrid;
