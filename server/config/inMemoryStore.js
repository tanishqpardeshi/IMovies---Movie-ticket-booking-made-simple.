const {getInMemoryWorldMovies}=require('./worldMoviesData');
const bcrypt = require('bcryptjs');

// Pre-hashed passwords for seed accounts
// 'admin123' and 'user123'
const defaultAdminPassHash = bcrypt.hashSync('admin123', 10);
const defaultUserPassHash = bcrypt.hashSync('user123', 10);

const INITIAL_USERS = [
  {
    _id: '65f1a0000000000000000001',
    username: 'Admin Manager',
    email: 'admin@imovies.com',
    password: defaultAdminPassHash,
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    _id: '65f1a0000000000000000002',
    username: 'Eshani Jain',
    email: 'user@imovies.com',
    password: defaultUserPassHash,
    role: 'user',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_MOVIES = [
  {
    _id: '65f1b0000000000000000001',
    title: 'Dune: Part Two',
    description:
      'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    duration: 166,
    posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    releaseDate: '2024-03-01T00:00:00.000Z',
    ticketPrice: 320,
    theater: 'iMovies IMAX Laser - Screen 1',
    rating: 8.8,
    language: 'English',
    showtimes: ['10:30 AM', '02:15 PM', '06:30 PM', '10:00 PM']
  },
  {
    _id: '65f1b0000000000000000002',
    title: 'Oppenheimer',
    description:
      'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    genre: ['Biography', 'Drama', 'History'],
    duration: 180,
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    releaseDate: '2023-07-21T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.9,
    language: 'English',
    showtimes: ['11:00 AM', '03:00 PM', '07:00 PM']
  },
  {
    _id: '65f1b0000000000000000003',
    title: 'Spider-Man: Across the Spider-Verse',
    description:
      'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    genre: ['Animation', 'Action', 'Sci-Fi'],
    duration: 140,
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    releaseDate: '2023-06-02T00:00:00.000Z',
    ticketPrice: 250,
    theater: 'iMovies 4DX - Screen 3',
    rating: 8.7,
    language: 'English',
    showtimes: ['10:00 AM', '01:30 PM', '05:00 PM', '08:30 PM']
  },
  {
    _id: '65f1b0000000000000000004',
    title: 'The Batman',
    description:
      'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the citys hidden corruption.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 176,
    posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    releaseDate: '2022-03-04T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'iMovies IMAX Laser - Screen 1',
    rating: 8.3,
    language: 'English',
    showtimes: ['12:00 PM', '04:00 PM', '08:00 PM']
  },
  {
    _id: '65f1b0000000000000000005',
    title: 'Interstellar',
    description:
      'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft to find a new planet for humans.',
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    duration: 169,
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    releaseDate: '2014-11-07T00:00:00.000Z',
    ticketPrice: 350,
    theater: 'iMovies 70mm IMAX - Screen 1',
    rating: 9.0,
    language: 'English',
    showtimes: ['11:30 AM', '03:30 PM', '07:30 PM']
  },
  {
    _id: '65f1b0000000000000000006',
    title: 'Top Gun: Maverick',
    description:
      'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when leading TOP GUNs elite graduates.',
    genre: ['Action', 'Drama'],
    duration: 130,
    posterUrl: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    releaseDate: '2022-05-27T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.4,
    language: 'English',
    showtimes: ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM']
  },...getInMemoryWorldMovies()
];

const today = new Date().toISOString().split('T')[0];
const INITIAL_BOOKINGS = [
  {
    _id: '65f1c0000000000000000001',
    user: '65f1a0000000000000000002',
    movie: '65f1b0000000000000000001',
    seats: ['D4', 'D5', 'E6', 'E7'],
    totalPrice: 1280,
    showDate: today,
    showTime: '06:30 PM',
    bookingDate: new Date().toISOString()
  }
];

class InMemoryStore {
  constructor() {
    this.users = [...INITIAL_USERS];
    this.movies = [...INITIAL_MOVIES];
    this.bookings = [...INITIAL_BOOKINGS];
    this.idCounter = 1000;
  }

  generateId() {
    this.idCounter += 1;
    return `65f1${this.idCounter.toString(16).padStart(20, '0')}`;
  }

  // Users
  findUserByEmail(email) {
    if (!email) return null;
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  findUserById(id) {
    return this.users.find((u) => u._id === id || String(u._id) === String(id)) || null;
  }

  createUser(userData) {
    const user = {
      _id: this.generateId(),
      username: userData.username,
      email: userData.email.toLowerCase(),
      password: userData.password,
      role: userData.role || 'user',
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  // Movies
  getMovies(search, genre) {
    let list = [...this.movies];
    if (search) {
      const s = search.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(s));
    }
    if (genre && genre !== 'All') {
      list = list.filter((m) => Array.isArray(m.genre) && m.genre.includes(genre));
    }
    return list;
  }

  getMovieById(id) {
    return this.movies.find((m) => m._id === id || String(m._id) === String(id)) || null;
  }

  createMovie(movieData) {
    const movie = {
      _id: this.generateId(),
      title: movieData.title,
      description: movieData.description || '',
      genre: Array.isArray(movieData.genre)
        ? movieData.genre
        : movieData.genre
        ? movieData.genre.split(',').map((g) => g.trim())
        : ['Action'],
      duration: Number(movieData.duration) || 120,
      posterUrl: movieData.posterUrl || '',
      releaseDate: movieData.releaseDate ? new Date(movieData.releaseDate).toISOString() : new Date().toISOString(),
      ticketPrice: Number(movieData.ticketPrice) || 250,
      theater: movieData.theater || 'iMovies IMAX Laser - Screen 1',
      rating: Number(movieData.rating) || 8.5,
      language: movieData.language || 'English',
      showtimes:
        Array.isArray(movieData.showtimes) && movieData.showtimes.length > 0
          ? movieData.showtimes
          : ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM'],
      createdAt: new Date().toISOString()
    };
    this.movies.unshift(movie);
    return movie;
  }

  // Bookings
  getOccupiedSeats(movieId, showDate, showTime) {
    const matching = this.bookings.filter(
      (b) =>
        (b.movie === movieId || String(b.movie) === String(movieId)) &&
        b.showDate === showDate &&
        b.showTime === showTime
    );
    const occupied = [...new Set(matching.flatMap((b) => b.seats))];
    return occupied;
  }

  createBooking({ userId, movie, seats, totalPrice, showDate, showTime }) {
    const booking = {
      _id: this.generateId(),
      user: userId,
      movie,
      seats,
      totalPrice,
      showDate,
      showTime,
      bookingDate: new Date().toISOString()
    };
    this.bookings.push(booking);
    return booking;
  }

  getUserBookings(userId) {
    const userBookings = this.bookings
      .filter((b) => b.user === userId || String(b.user) === String(userId))
      .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));

    return userBookings.map((b) => {
      const movieDoc = this.getMovieById(b.movie) || {};
      const userDoc = this.findUserById(b.user) || {};
      return {
        ...b,
        movie: movieDoc,
        user: {
          _id: userDoc._id,
          username: userDoc.username,
          email: userDoc.email
        }
      };
    });
  }
}

const inMemoryStore = new InMemoryStore();
module.exports = inMemoryStore;
