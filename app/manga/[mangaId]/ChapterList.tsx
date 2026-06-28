'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ChapterListItem {
  chapter_id: string;
  chapter_number: number;
  chapter_title?: string;
  release_date?: string;
}

interface ChapterListResponse {
  retcode: number;
  message: string;
  meta: {
    page: number;
    page_size: number;
    total_record: number;
    total_page: number;
  };
  data: ChapterListItem[];
}

export default function ChapterList({ mangaId }: { mangaId: string }) {
  const [chapters, setChapters] = useState<ChapterListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 50;

  useEffect(() => {
    async function fetchChapters() {
      setLoading(true);
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const response = await fetch(
          `${base}/v1/chapter/${mangaId}/list?sort_by=chapter_number&sort_order=desc&page=${currentPage}&page_size=${pageSize}`
        );
        const json = await response.json();
        setChapters(json.data || []);
        if (json.meta) {
          setTotalPages(json.meta.total_page);
          setTotalItems(json.meta.total_record);
        }
      } catch (error) {
        console.error('Failed to fetch chapters:', error);
        setChapters([]);
      } finally {
        setLoading(false);
      }
    }
    fetchChapters();
  }, [mangaId, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className="px-3.5 py-2 rounded-xl font-semibold bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 text-gray-400 font-bold">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
            i === currentPage
              ? 'bg-purple-600 text-white shadow-lg scale-110'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 text-gray-400 font-bold">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="px-3.5 py-2 rounded-xl font-semibold bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>      
      {loading ? (
        <div className="bg-purple-100 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-purple-700 font-medium">Memuat chapter...</span>
          </div>
        </div>
      ) : chapters.length === 0 ? (
        <div className="bg-gray-100 rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600 font-medium">Belum ada chapter tersedia</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Chapter count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Total <span className="font-bold text-purple-600">{totalItems}</span> Chapter
            </p>
          </div>

          {/* Chapter List */}
          <div className="grid gap-3">
            {chapters.map((chapter, index) => (
              <Link
                key={chapter.chapter_id}
                href={`/chapter/${chapter.chapter_id}`}
                className="group flex items-center justify-between p-4 bg-white hover:bg-purple-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-200"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Chapter Number Badge */}
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {chapter.chapter_number}
                  </div>
                  
                  {/* Chapter Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      Chapter {chapter.chapter_number}
                    </div>
                    {chapter.chapter_title && (
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {chapter.chapter_title}
                      </div>
                    )}
                  </div>
                </div>

                {/* Date and Arrow */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {chapter.release_date && (
                    <span className="hidden sm:block text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {new Date(chapter.release_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  )}
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all"
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
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-2xl p-6 shadow-md">
              <div className="text-sm text-gray-600 font-medium">
                Halaman <span className="text-purple-600 font-bold">{currentPage}</span> dari{' '}
                <span className="text-purple-600 font-bold">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
                >
                  ← Sebelumnya
                </button>
                
                <div className="hidden sm:flex items-center gap-1.5">
                  {renderPageNumbers()}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
                >
                  Selanjutnya →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
