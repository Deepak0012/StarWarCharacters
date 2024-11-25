import React from 'react';
import CharacterGrid from '../characterGrid/CharacterGrid';
import './Favourites.css';

const Favourites: React.FC = () => {
  const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');

  return (
    <div className='fav-container'>
      {!favourites.length ?
        <p>No favourites found</p> :
        <CharacterGrid characters={favourites} />
      }
    </div>
  );
};

export default Favourites;
