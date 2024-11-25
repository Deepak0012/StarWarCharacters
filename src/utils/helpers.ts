
import { useLocation } from 'react-router-dom';

export const useIsFavouritesPage = (): boolean => {
  const location = useLocation();
  return location.pathname === '/favourites';
};