const OMDB_API_KEY = 'dab3307f';

const searchMovies = async(query: string) => {
  try{
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=dab3307f&s=${query}`);
    if(response.ok){
      const data = await response.json();
      return data.Search || [];
    }else{
      throw new Error('Error fetching movies');
    }
    }catch(error){
      console.error('Error fetching movies:', error);
      return [];
    }
  };
export default searchMovies;


export const getMovieDetails = async (id: string) => {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error fetching movie details');
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

