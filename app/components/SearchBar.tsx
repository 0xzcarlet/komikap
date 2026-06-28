"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResult {
  manga_id: string;
  title: string;
  cover_image_url: string;
  latest_chapter_number?: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        searchManga(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchManga = async (searchQuery: string) => {
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const response = await fetch(
        `${base}/v1/manga/list?search=${encodeURIComponent(searchQuery)}&page=1&page_size=5`
      );
      const json = await response.json();
      setResults(json.data || []);
      setIsOpen(true);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari manga favorit..."
          className="w-full px-4 py-2.5 pl-11 pr-4 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors bg-white/90 backdrop-blur"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </form>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {results.map((manga) => (
            <Link
              key={manga.manga_id}
              href={`/manga/${manga.manga_id}`}
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={manga.cover_image_url}
                  alt={manga.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                  {manga.title}
                </h4>
                {manga.latest_chapter_number && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    Ch. {manga.latest_chapter_number}
                  </p>
                )}
              </div>
            </Link>
          ))}
          {results.length >= 5 && (
            <button
              onClick={handleSubmit}
              className="w-full p-3 text-center text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors"
            >
              Lihat semua hasil untuk "{query}"
            </button>
          )}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && !loading && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 text-center z-50">
          <p className="text-gray-500">Tidak ada hasil untuk "{query}"</p>
        </div>
      )}
    </div>
  );
}
