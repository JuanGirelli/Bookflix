import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface Movie {
  Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
    
  // Add other properties as needed
}

const MovieCard: React.FC<{ movies: Movie }> = ({ movies }) =>  {

  return (
    <Card style={{ width: '26rem' }}>
        {/* <Link to={`google.com`}> */}
      <Card.Img className ='card-image' src={movies.Poster}/>
        {/* </Link> */}
      <Card.Body>
        <Card.Title className='card-title'>{movies.Title}</Card.Title>
        <Card.Text className='card-text'>{movies.Year}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        
      </ListGroup>
      <Card.Body>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
