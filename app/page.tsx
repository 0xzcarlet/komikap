import MangaCard from './components/MangaCard';
import HeroBanner from './components/HeroBanner';

/**
 * Fetches recommended and top manga lists from the Shinigami API. The calls
 * happen on the server at request time so fresh data is always served.
 */
async function getHomeData() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [recRes, topRes] = await Promise.all([
    fetch(`${base}/v1/manga/list?is_recommended=1&page=1&page_size=12`, {
      cache: 'no-store',
    }),
    fetch(`${base}/v1/manga/top?filter=all_time&page=1&page_size=10`, {
      cache: 'no-store',
    }),
  ]);
  const recJson = await recRes.json();
  const topJson = await topRes.json();
  return {
    recommended: recJson.data || [],
    top: topJson.data || [],
  };
}

export default async function HomePage() {
  const { recommended, top } = await getHomeData();
  
  // Use top 3 for featured banner
  const featured = top.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <HeroBanner featuredManga={featured} />

      {/* Recommended Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-700">
              🔥 Rekomendasi Untukmu
            </h2>
            <p className="text-gray-600 text-sm mt-1">Manga pilihan yang sedang trending</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {recommended.map((manga: any) => (
            <MangaCard key={manga.manga_id} manga={manga} />
          ))}
        </div>
      </section>

      {/* Top All Time Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-700">
              👑 Top Sepanjang Masa
            </h2>
            <p className="text-gray-600 text-sm mt-1">Manga terpopuler yang wajib dibaca</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {top.map((manga: any) => (
            <MangaCard key={manga.manga_id} manga={manga} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-purple-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Temukan Manga Favoritmu
        </h2>
        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
          Ribuan manga dari berbagai genre menunggumu. Baca gratis dan update chapter terbaru setiap hari!
        </p>
        <a
          href="/search"
          className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Jelajahi Sekarang
        </a>
      </section>
    </div>
  );
}
