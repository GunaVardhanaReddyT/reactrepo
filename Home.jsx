import './Home.css';
import { useState } from 'react';

function Home() {
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([
    { name: 'Daaku Maharaja', image: '/download (1).jpeg' },
    { name: 'Locked', image: '/images (2).jpeg' },
    { name: 'Thelusu Kada', image: '/images (3).jpeg' },
    { name: 'Chhaava', image: '/images (4).jpeg' },
    { name: 'Game Changer', image: '/images (5).jpeg' },
  ]);

  // Array of all movies
  const movies = [
    { name: 'Daaku Maharaja', image: '/download (1).jpeg' },
    { name: 'Locked', image: '/images (2).jpeg' },
    { name: 'Thelusu Kada', image: '/images (3).jpeg' },
    { name: 'Chhaava', image: '/images (4).jpeg' },
    { name: 'Game Changer', image: '/images (5).jpeg' },
  ];

  const handleSearch = () => {
    const searchTerm = search.trim().replace(/\s+/g, ' ').toLowerCase();
    console.log('Search term:', searchTerm);

    const movieExists = movies.some(movie => {
      const normalizedMovieName = movie.name.toLowerCase().replace(/\s+/g, ' ');
      console.log('Comparing with:', normalizedMovieName);
      return normalizedMovieName === searchTerm;
    });

    if (movieExists) {
      setMessage('Movie available');
      // Filter to only show the matching movie
      setFilteredMovies(
        movies.filter(
          movie =>
            movie.name.toLowerCase().replace(/\s+/g, ' ') === searchTerm
        )
      );
    } else {
      setMessage('Movie not available');
      // Optionally reset to all movies or keep empty
      setFilteredMovies(movies); // Reset to all movies
      // Or: setFilteredMovies([]); // Show no movies
    }
  };

  const handleMovieClick = (movieName) => {
    console.log('Movie clicked:', movieName);
    const url = `/movie?movie=${encodeURIComponent(movieName)}`;
    console.log('Opening URL:', url);
    window.open(url, '_blank');
  };

  return (
    <div className="home-container">
      {/* Left side: Search box */}
      <div className="search-box">
        <h1>BookMyShow</h1>
        <p>Online Ticket Booking Portal</p>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {message && <p className="message">{message}</p>}
      </div>

      {/* Right side: Image container */}
      <div className="image-container">
        {/* Display filtered movies */}
        <div className="image-row">
          {filteredMovies.map((movie, index) => (
            <img
              key={index}
              src={movie.image}
              alt={movie.name}
              className="movie-image"
              onClick={() => handleMovieClick(movie.name)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;