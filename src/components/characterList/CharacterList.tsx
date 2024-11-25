import React, { useState, useEffect } from 'react';
import { fetchCharacters } from '../../services/swapi';
import './CharacterList.css';
import CharacterGrid from '../characterGrid/CharacterGrid';

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const data = await fetchCharacters(page, debouncedSearch);
      setCharacters(data.results || []);
      setHasNextPage(data.next !== null);
      setLoading(false);
    };

    loadCharacters();
  }, [page, debouncedSearch]);

  useEffect(() => {
    //Trigger debounce effect when search term changes 
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  return (
    <div className="character-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : (
        <CharacterGrid characters={characters} />
      )}

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
