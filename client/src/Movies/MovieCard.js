import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  const edit = () => {
     props.history.push(`/update-movie/${props.movie.id}`);
  }
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button onClick={edit}>Edit Movie</button>
    </div>
  );
};

export default MovieCard;
