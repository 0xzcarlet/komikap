"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FeaturedManga {
  manga_id: string;
  title: string;
  cover_image_url: string;
  description?: string;
  latest_chapter_number?: number;
}

interface Props {
  featuredManga: FeaturedManga[];
}

export default function HeroBanner({ featuredManga }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredManga.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredManga.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredManga.length]);

  if (!featuredManga || featuredManga.length === 0) return null;

  const currentManga = featuredManga[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentManga.cover_image_url}
          alt={currentManga.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-4 animate-fade-in">
          <div className="inline-block px-3 py-1 bg-purple-600 rounded-full text-white text-sm font-semibold mb-2">
            ⭐ Featured
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg line-clamp-2">
            {currentManga.title}
          </h2>
          {currentManga.description && (
            <p className="text-white/90 text-lg line-clamp-3 drop-shadow">
              {currentManga.description}
            </p>
          )}
          <div className="flex items-center gap-4 pt-4">
            <Link
              href={`/manga/${currentManga.manga_id}`}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              Baca Sekarang
            </Link>
            {currentManga.latest_chapter_number && (
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                Chapter {currentManga.latest_chapter_number}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {featuredManga.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredManga.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {featuredManga.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? featuredManga.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % featuredManga.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
