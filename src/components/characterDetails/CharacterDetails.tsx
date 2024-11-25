import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterDetails } from '../../services/swapi';
import './CharacterDetails.css';

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<any>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    if (id) {
      const isAlreadyFavourite = favourites.some((fav: any) => fav.id === id);
      setIsFavourite(isAlreadyFavourite);
      fetchCharacterDetails(id).then(setDetails);
    }
  }, [id]);

  const addToFavourites = () => {
    if (details && !isFavourite) {
      const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
      favourites.push({ id, ...details });
      localStorage.setItem('favourites', JSON.stringify(favourites));
      setIsFavourite(true);
      alert(`${details.name} has been added to your favourites!`);
    }
  };

  const removeFromFavourites = () => {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    const updatedFavourites = favourites.filter((item: any) => item.id !== id);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    setIsFavourite(false);
    alert(`The item has been removed from your favourites!`);
  };

  if (!details) return <div className="character-details-container">Loading...</div>;

  return (
    <div className="character-details-container">
      <div className="character-details-header">
        <h1>{details.name}</h1>
        <button
          className="favourites-btn"
          onClick={isFavourite ? removeFromFavourites : addToFavourites}
        >
          {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
        </button>
      </div>
      <ul className="character-details-list">
        <li><strong>Hair Color:</strong> {details.hair_color}</li>
        <li><strong>Eye Color:</strong> {details.eye_color}</li>
        <li><strong>Gender:</strong> {details.gender}</li>
        <li><strong>Height:</strong> {details.height}</li>
        <li><strong>Home Planet:</strong> {details.homeworldName}</li>
        <li><strong>Films:</strong> {details.filmsTitles.join(', ')}</li>
        <li><strong>Starships:</strong> {details.starshipsNames.join(', ') || 'None'}</li>
      </ul>
      <div className="character-details-footer">
        <a href={`/`}>&#8592; Back to Characters</a>
      </div>
    </div>
  );
};

export default CharacterDetails;
