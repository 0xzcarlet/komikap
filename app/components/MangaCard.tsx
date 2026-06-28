"use client";

import Link from 'next/link';
import Image from 'next/image';

export interface MangaListItem {
  manga_id: string;
  title: string;
  cover_image_url: string;
  latest_chapter_number?: number;
}

interface Props {
  manga: MangaListItem;
}

/**
 * A reusable card component for displaying a manga item with modern design.
 * Features hover effects and smooth transitions.
 */
export default function MangaCard({ manga }: Props) {
  return (
    <Link
      href={`/manga/${manga.manga_id}`}
      className="group block relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
    >
      {/* Cover Image Container */}
      <div className="relative w-full pb-[150%] overflow-hidden bg-gray-100">
        <Image
          src={manga.cover_image_url}
          alt={manga.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Chapter Badge */}
        {manga.latest_chapter_number !== undefined && (
          <div className="absolute top-2 right-2 px-2.5 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
            Ch. {manga.latest_chapter_number}
          </div>
        )}

        {/* Read Now Button - Shows on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="bg-white text-purple-600 text-center py-2 rounded-lg font-semibold text-sm shadow-lg">
            Baca Sekarang →
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold line-clamp-2 mb-1 text-sm sm:text-base text-gray-800 group-hover:text-purple-600 transition-colors">
          {manga.title}
        </h3>
      </div>
    </Link>
  );
}
