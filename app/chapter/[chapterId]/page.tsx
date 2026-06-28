import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface ChapterDetail {
  chapter_number: number;
  chapter_title?: string;
  base_url: string;
  base_url_low?: string;
  chapter: {
    path: string;
    data: string[];
  };
  manga_id?: string;
}

async function getChapter(chapterId: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${base}/v1/chapter/detail/${chapterId}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch chapter');
  const json = await res.json();
  return json.data as ChapterDetail;
}

export default async function ChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  let chapter: ChapterDetail;
  try {
    chapter = await getChapter(params.chapterId);
  } catch (error) {
    notFound();
  }
  const baseImageUrl = chapter.base_url_low || chapter.base_url;
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-purple-700 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Chapter {chapter.chapter_number}
            </h1>
            {chapter.chapter_title && (
              <p className="text-white/90">{chapter.chapter_title}</p>
            )}
          </div>
          {chapter.manga_id && (
            <Link
              href={`/manga/${chapter.manga_id}`}
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:shadow-xl transition-all transform hover:scale-105"
            >
              ← Kembali ke Detail
            </Link>
          )}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 text-white/90 text-sm">
          <span className="font-semibold">{chapter.chapter.data.length}</span> Halaman
        </div>
      </div>

      {/* Chapter Images */}
      <div className="space-y-1">
        {chapter.chapter.data.map((file, index) => {
          const src = `${baseImageUrl}${chapter.chapter.path}${file}`;
          return (
            <div key={file} className="relative w-full bg-black group">
              {/* Page number overlay */}
              <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {index + 1} / {chapter.chapter.data.length}
              </div>
              
              <Image
                src={src}
                alt={`Page ${index + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto"
                priority={index < 3}
              />
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 bg-purple-700 rounded-2xl p-8 text-center shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          Selesai Chapter {chapter.chapter_number}
        </h3>
        <p className="text-white/90 mb-6">
          Kembali ke halaman detail untuk membaca chapter lainnya
        </p>
        {chapter.manga_id && (
          <Link
            href={`/manga/${chapter.manga_id}`}
            className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Lihat Semua Chapter
          </Link>
        )}
      </div>
    </div>
  );
}
