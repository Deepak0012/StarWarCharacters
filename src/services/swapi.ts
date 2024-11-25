import axios from 'axios';

const API_BASE_URL = 'https://swapi.dev/api/';

export const fetchCharacters = async (page: number = 1, search?: string) => {
  const response = await axios.get(`${API_BASE_URL}people/`, {
    params: { page, search },
  });
  return response.data;
};

export const fetchCharacterDetails = async (id: string) => {
    // Fetch character details
    const characterResponse = await axios.get(`${API_BASE_URL}people/${id}/`);
    const character = characterResponse.data;
  
    // Fetch homeworld details
    const homeworldResponse = await axios.get(character.homeworld);
    const homeworldName = homeworldResponse.data.name;
  
    // Fetch films details
    const filmsPromises = character.films.map((filmUrl: string) =>
      axios.get(filmUrl).then((response) => response.data.title)
    );
    const filmsTitles = await Promise.all(filmsPromises);
  
    // Fetch starships details
    const starshipsPromises = character.starships.map((starshipUrl: string) =>
      axios.get(starshipUrl).then((response) => response.data.name)
    );
    const starshipsNames = await Promise.all(starshipsPromises);
  
    return {
      ...character,
      homeworldName,
      filmsTitles,
      starshipsNames,
    };
  };

