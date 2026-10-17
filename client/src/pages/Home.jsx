import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Sparkles, X, Clapperboard, Award } from 'lucide-react';
import API from '../services/api';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../context/AuthContext';

const GENRES = ['All', 'Action', 'Sci-Fi', 'Drama', 'Adventure', 'Crime', 'Animation', 'Biography'];

const Home = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await API.get('/movies');
      const movieList = Array.isArray(res.data) ? res.data : res.data.movies || [];
      setMovies(movieList);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || (movie.genre && movie.genre.toLowerCase().includes(selectedGenre.toLowerCase()));
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-[#0b0d11] text-slate-100 p-6">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Experience Cinema in Unrivaled Luxury.</h1>
        <p className="text-slate-400">Select handcrafted recliners on our real-time auditorium map.</p>
      </div>

      {/* Search & Genres */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blockbusters by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedGenre === genre ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div className="text-center py-20 text-amber-500">Loading worldwide movies...</div>
      ) : filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie._id || movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">No movies found matching your filters.</div>
      )}
    </div>
  );
};

export default Home;