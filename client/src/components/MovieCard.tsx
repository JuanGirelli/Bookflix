import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface Movie {
  Title: string;
    Year: string;
    Poster: string;
    imdbID?: string;
    
  // Add other properties as needed
}


const MovieCard: React.FC<{
  movie: Movie,
  likedMovies: any,
  bookmarkedMovies: any,
  handleBookmark: any,
  handleLike: any,
}> = ({ movie, likedMovies, bookmarkedMovies, handleBookmark, handleLike }) =>  {

  return (
    <Card style={{
      width: '26rem',
      background: 'none',
      border: 'none',
    }}>
        {/* <Link to={`google.com`}> */}
      <Card.Img className ='card-image' src={movie.Poster}/>
        {/* </Link> */}
      <Card.Body>
        <Card.Title className='card-title'>{movie.Title}</Card.Title>
        <Card.Text className='card-text'>{movie.Year}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        
      </ListGroup>
      <Card.Body>
      <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleLike(movie.imdbID)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: likedMovies.includes(movie.imdbID)
                    ? '#28a745'
                    : '#f8f9fa',
                  color: likedMovies.includes(movie.imdbID) ? '#fff' : '#000',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginRight: '5px',
                  cursor: 'pointer',
                }}
              >
                {likedMovies.includes(movie.imdbID) ? 'Unlike' : 'Like'}
              </button>
              <button
                onClick={() => handleBookmark(movie.imdbID)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: bookmarkedMovies.includes(movie.imdbID)
                    ? '#ffc107'
                    : '#f8f9fa',
                  color: bookmarkedMovies.includes(movie.imdbID) ? '#fff' : '#000',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {bookmarkedMovies.includes(movie.imdbID)
                  ? 'Unbookmark'
                  : 'Bookmark'}
              </button>
            </div>
      </Card.Body>
      
    </Card>
  );
}

export default MovieCard;
