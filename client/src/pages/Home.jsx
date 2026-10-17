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

  // Admin Add Movie Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    genre: 'Action, Sci-Fi',
    duration: 145,
    posterUrl: '',
    ticketPrice: 280,
    theater: 'iMovies IMAX Laser - Screen 1'
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/movies', {
        params: {
          search: search || undefined,
          genre: selectedGenre !== 'All' ? selectedGenre : undefined
        }
      });
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, selectedGenre]);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await API.post('/movies', {
        ...newMovie,
        genre: newMovie.genre.split(',').map((g) => g.trim())
      });
      setShowAddModal(false);
      setNewMovie({
        title: '',
        description: '',
        genre: 'Action, Sci-Fi',
        duration: 145,
        posterUrl: '',
        ticketPrice: 280,
        theater: 'iMovies IMAX Laser - Screen 1'
      });
      fetchMovies();
    } catch (error) {
      console.error('Failed to add movie', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Luxury Cinematic Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#11141c] via-[#161a24] to-[#11141c] border border-amber-500/20 p-8 sm:p-12 shadow-2xl shadow-black/60 cinema-vignette">
        {/* Subtle Ambient Gold Glow Top */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-md">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Curated Screenings & Recliner Booking
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Experience Cinema in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Unrivaled Luxury.</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Select handcrafted leather recliners on our real-time auditorium map. Featuring 4K Laser IMAX projection, Dolby Atmos sound, and seamless digital booking passes.
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Live Seat Conflict Prevention
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Instant Perforated Ticket Passes
            </span>
          </div>
        </div>
      </div>

      {/* Search, Genre Filter & Admin Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search blockbusters by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#12151d] border border-amber-500/20 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors shadow-inner"
          />
        </div>

        {/* Clean Segmented Genre Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-[#10131a] p-1.5 rounded-xl border border-slate-800/80">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                selectedGenre === genre
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Admin Add Movie Button */}
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#1a1e28] hover:bg-[#222734] text-amber-400 border border-amber-500/30 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-md shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Add Film (Admin)
          </button>
        )}
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-96 rounded-2xl bg-[#12151d] border border-slate-800/60 animate-pulse" />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-16 bg-[#12151d]/60 rounded-2xl border border-slate-800 space-y-2">
          <Clapperboard className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-semibold text-base">No movies found matching your selection.</p>
          <p className="text-xs text-slate-500">Try adjusting your search terms or genre filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.isArray(movies) && movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

      {/* Admin Add Movie Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#13161f] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl shadow-black/80">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                Add Film Presentation
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMovie} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-slate-300 mb-1 text-xs font-semibold">Movie Title *</label>
                <input
                  type="text"
                  required
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-lg px-3 py-2 text-white focus:outline-none"
                  placeholder="e.g., Gladiator II"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 text-xs font-semibold">Description</label>
                <textarea
                  rows="2"
                  value={newMovie.description}
                  onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                  className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-lg px-3 py-2 text-white focus:outline-none"
                  placeholder="Official plot synopsis..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 text-xs font-semibold">Genres (comma-separated)</label>
                  <input
                    type="text"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 text-xs font-semibold">Duration (mins)</label>
                  <input
                    type="number"
                    value={newMovie.duration}
                    onChange={(e) => setNewMovie({ ...newMovie, duration: Number(e.target.value) })}
                    className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 text-xs font-semibold">Ticket Price (₹)</label>
                  <input
                    type="number"
                    value={newMovie.ticketPrice}
                    onChange={(e) => setNewMovie({ ...newMovie, ticketPrice: Number(e.target.value) })}
                    className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 text-xs font-semibold">Poster URL</label>
                  <input
                    type="url"
                    value={newMovie.posterUrl}
                    onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-slate-700/80 focus:border-amber-400 rounded-lg px-3 py-2 text-white focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#1a1e28] text-slate-300 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  {submitting ? 'Saving...' : 'Publish Movie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;