import './Home2.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Static movie details (since we can't fetch from Google)
const movieDetails = {
  'Daaku Maharaja': {
    image: '/download (1).jpeg',
    rating: '7.8/10 (50K votes)',
    languages: 'Hindi, Tamil, Telugu',
    duration: '2h 45m',
    genre: 'Action, Drama',
    releaseDate: '15 August 2025',
    description: 'A powerful story of a fearless leader fighting for justice in a corrupt world.',
    trailerId: 'slmCdr2Er4k', // Actual YouTube Video ID for Daaku Maharaja
  },
  'Locked': {
    image: '/images (2).jpeg',
    rating: '7.6/10 (40.1K votes)',
    languages: 'Tamil, Kannada, Hindi, Telugu',
    duration: '2h 48m',
    genre: 'Action, Thriller',
    releaseDate: '1 May 2025',
    description: 'A gripping thriller about a man trapped in a dangerous game of survival.',
    trailerId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
  },
  'Thelusu Kada': {
    image: '/images (3).jpeg',
    rating: '8.0/10 (30K votes)',
    languages: 'Telugu, Tamil',
    duration: '2h 30m',
    genre: 'Comedy, Drama',
    releaseDate: '10 June 2025',
    description: 'A heartwarming tale of friendship and love set in a small village.',
    trailerId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
  },
  'Chhaava': {
    image: '/images (4).jpeg',
    rating: '7.5/10 (25K votes)',
    languages: 'Hindi, Marathi',
    duration: '3h 10m',
    genre: 'Historical, Action',
    releaseDate: '20 December 2024',
    description: 'An epic historical drama depicting the life of a legendary warrior.',
    trailerId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    cast: [
      { name: 'Vicky Kaushal', role: 'Chhatrapati Sambhaji Maharaj', image: '/vicky-kaushal.jpg' }, // Placeholder, replace with actual data
      { name: 'Rashmika Mandanna', role: 'Actor', image: '/rashmika-mandanna.jpg' }, // Placeholder, replace with actual data
      { name: 'Akshaye Khanna', role: 'Actor', image: '/akshaye-khanna.jpg' }, // Placeholder, replace with actual data
    ],
  },
  'Game Changer': {
    image: '/images (5).jpeg',
    rating: '8.2/10 (60K votes)',
    languages: 'Telugu, Hindi, Tamil',
    duration: '2h 55m',
    genre: 'Action, Political Thriller',
    releaseDate: '5 January 2025',
    description: 'A high-stakes political thriller about a man challenging a corrupt system.',
    trailerId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
  },
  'HIT: The Third Case': {
    image: '/hit-third-case.jpeg', // Replace with actual image path
    rating: 'TBD', // Update with actual rating if available
    languages: 'Telugu, Hindi, Tamil',
    duration: 'TBD', // Update with actual duration if available
    genre: 'Action, Thriller',
    releaseDate: 'TBD', // Update with actual release date if available
    description: 'Arjun Sarkaar joins Vizag HIT on a mission to solve a series of gritty murders that he had been encountering for some time in his career. Investigation leads him to the four corners of grave danger, only to put him and team in the centre of grave danger, leaving him to choose the only way out. Violence.',
    trailerId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
    cast: [
      { name: 'Nani', role: 'Arjun Sarkaar', image: '/nani.jpg' },
      { name: 'Srinidhi Shetty', role: 'Mrudula', image: '/srinidhi-shetty.jpg' },
      { name: 'Samuthirakani', role: 'ASP Ravi', image: '/samuthirakani.jpg' },
      { name: 'Surya Srinivas', role: 'Actor', image: '/surya-srinivas.jpg' },
      { name: 'Prateik Babbar', role: 'Actor', image: '/prateik-babbar.jpg' },
    ],
  },
};

function Home2() {
  // Get the movie name from the query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get('movie')?.replace(/\s+/g, ' ').trim() || 'Daaku Maharaja'; // Normalize spaces and trim
  console.log('Movie name from query:', movieName);

  // State to manage the selected location
  const [selectedLocation, setSelectedLocation] = useState('Vijayawada'); // Default to current location
  // State to manage the rating popup visibility
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  // State to manage the user's selected rating
  const [userRating, setUserRating] = useState(0);
  // State to manage the hover state for stars
  const [hoverRating, setHoverRating] = useState(0);
  // State to store the submitted rating
  const [submittedRating, setSubmittedRating] = useState(null);

  // List of available locations
  const locations = ['Vijayawada', 'Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'];

  // Get movie details
  const movie = movieDetails[movieName] || movieDetails['Daaku Maharaja'];
  if (!movieDetails[movieName]) {
    console.warn(`Movie "${movieName}" not found, defaulting to Daaku Maharaja`);
  }
  console.log('Movie details:', movie);

  // Handle rating submission
  const handleSubmitRating = () => {
    setSubmittedRating(userRating);
    setShowRatingPopup(false);
    setUserRating(0); // Reset user rating for next time
    setHoverRating(0); // Reset hover rating
  };

  // Handle share button click
  const handleShare = () => {
    const shareData = {
      title: `Check out ${movieName}`,
      text: `I'm watching ${movieName}! Check it out here:`,
      url: `https://yourapp.com/movie?movie=${encodeURIComponent(movieName)}`, // Replace with your app's URL
    };

    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback to WhatsApp sharing
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
        `${shareData.text} ${shareData.url}`
      )}`;
      window.location.href = whatsappUrl;
    }
  };

  // Handle "Book tickets" button click to open Theater.jsx in a new tab
  const handleBookTickets = () => {
    // Open a new tab with the theater selection page, passing the movie name as a query parameter
    window.open(`/theater?movie=${encodeURIComponent(movieName)}`, '_blank');
  };

  return (
    <div className="movie-details-container">
      {/* Header */}
      <header className="header">
        <div className="logo">bookmyshow</div>
        <div className="nav-links">
          <span>Movies</span>
          <span>Stream</span>
          <span>Plays</span>
          <span>Sports</span>
          <span>Activities</span>
        </div>
        <div className="header-right">
          <select
            className="location-dropdown"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Movie Details Section */}
      <div className="movie-details">
        <div className="movie-poster">
          <img src={movie.image} alt={movieName} />
        </div>
        <div className="movie-info">
          <h1>{movieName}</h1>
          <div className="rating">
            <span>⭐ {movie.rating}</span>
            <button
              className="rate-btn"
              onClick={() => setShowRatingPopup(true)}
            >
              Rate now
            </button>
            {submittedRating && (
              <span className="user-rating">
                Your rating: {submittedRating}/5 ⭐
              </span>
            )}
          </div>
          <div className="details">
            <span>Trailers (7)</span>
            <span>2D</span>
            <span>{movie.languages}</span>
          </div>
          <div className="meta">
            <span>{movie.duration} • {movie.genre} • UA16+ • {movie.releaseDate}</span>
          </div>
          <button className="book-tickets-btn" onClick={handleBookTickets}>
            Book tickets
          </button>
          <span className="in-cinemas">In cinemas</span>
        </div>
        <div className="share">
          <button className="share-btn" onClick={handleShare}>
            Share
          </button>
        </div>
      </div>

      {/* Rating Popup */}
      {showRatingPopup && (
        <div className="rating-popup-overlay">
          <div className="rating-popup">
            <h3>Rate this movie</h3>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || userRating) ? 'filled' : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                >
                  ⭐
                </span>
              ))}
            </div>
            <div className="rating-actions">
              <button className="submit-rating-btn" onClick={handleSubmitRating}>
                Submit
              </button>
              <button
                className="cancel-rating-btn"
                onClick={() => {
                  setShowRatingPopup(false);
                  setUserRating(0);
                  setHoverRating(0);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trailer Section */}
      <div className="trailer-section">
        <h2>Trailer</h2>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movie.trailerId}`}
          title={`${movieName} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* About the Movie */}
      <div className="about-movie">
        <h2>About the movie</h2>
        <p>{movie.description}</p>
      </div>

      {/* Cast Section */}
      {movie.cast && (
        <div className="cast-section">
          <h2>Cast</h2>
          <div className="cast-list">
            {movie.cast.map((actor, index) => (
              <div key={index} className="cast-member">
                <img src={actor.image} alt={actor.name} />
                <p>{actor.name}</p>
                <p>{actor.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home2;