import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CharacterList from './components/characterList/CharacterList';
import CharacterDetails from './components/characterDetails/CharacterDetails';
import Favourites from './components/favourites/Favourites';
import { useIsFavouritesPage } from './utils/helpers';

const App: React.FC = () => {
  const isFavouritesPage = useIsFavouritesPage();
  return (
    <div className="app">
      <header>
        <h1>Star Wars Characters</h1>
        <span>&#128073; </span>{isFavouritesPage ? <Link to="/">See all characters</Link> : <Link to="/favourites">See your favourites</Link>}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
