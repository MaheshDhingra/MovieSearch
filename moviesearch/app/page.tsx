'use client';
import { useState } from "react";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "b9ba495b";

  const searchMovies = async (title: string) => {
    if (!title) return;

    setLoading(true);
    const res = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}`);
    const data = await res.json();
    setMovies(data.Search || []); 
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(query);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full max-w-md rounded"
        />
      </form>

      {loading && <p>Loading...</p>}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="border p-2 rounded shadow">
              <img src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"} alt={movie.Title} className="w-full h-auto" />
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
