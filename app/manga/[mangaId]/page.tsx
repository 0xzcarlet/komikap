import Image from 'next/image';
import { notFound } from 'next/navigation';
import ChapterList from './ChapterList';
import { apiUrl } from '../../lib/api';

interface MangaDetail {
  title: string;
  description: string;
  cover_image_url: string;
  taxonomy?: Record<string, string[]>;
  latest_chapter_number?: number;
  latest_chapter_id?: string;
}

async function getMangaDetail(mangaId: string) {
  const detailRes = await fetch(apiUrl(`/v1/manga/detail/${mangaId}`), {
    cache: 'no-store',
  });
  if (!detailRes.ok) {
    throw new Error('Failed to fetch manga detail');
  }
  const detailJson = await detailRes.json();
  return detailJson.data as MangaDetail;
}

export default async function MangaDetailPage({
  params,
}: {
  params: { mangaId: string };
}) {
  let detail: MangaDetail;
  try {
    detail = await getMangaDetail(params.mangaId);
  } catch (err) {
    notFound();
  }
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-purple-700 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <div className="relative w-64 h-96 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50">
              <Image
                src={detail.cover_image_url}
                alt={detail.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6 text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                {detail.title}
              </h1>
              {detail.latest_chapter_number && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-semibold">Latest:</span>
                  <span className="font-bold">Chapter {detail.latest_chapter_number}</span>
                </div>
              )}
            </div>

            {detail.description && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  📖 Sinopsis
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {detail.description}
                </p>
              </div>
            )}

            {/* Taxonomy/Genres */}
            {detail.taxonomy && Object.keys(detail.taxonomy).length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3">📚 Informasi</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(detail.taxonomy).map(([key, values]) => (
                    <div key={key} className="flex flex-wrap gap-2">
                      <span className="font-semibold capitalize min-w-[100px]">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(values) ? (
                          values.map((v, i) => {
                            const displayValue =
                              typeof v === 'object' && v !== null
                                ? (v as any).name || JSON.stringify(v)
                                : v;
                            return (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium"
                              >
                                {displayValue}
                              </span>
                            );
                          })
                        ) : (
                          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                            {String(values)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chapter List Section */}
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-700">
          📑 Daftar Chapter
        </h2>
        <ChapterList mangaId={params.mangaId} />
      </div>
    </div>
  );
}
