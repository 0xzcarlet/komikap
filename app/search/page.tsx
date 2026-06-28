import MangaCard from '../components/MangaCard';

async function getSearchResults(query: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(
    `${base}/v1/manga/list?search=${encodeURIComponent(query)}&page=1&page_size=24`,
    { cache: 'no-store' }
  );
  const json = await response.json();
  return json.data || [];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';
  const results = query ? await getSearchResults(query) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hasil Pencarian</h1>
        {query && (
          <p className="text-gray-600">
            Menampilkan hasil untuk: <span className="font-semibold text-purple-600">"{query}"</span>
          </p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((manga: any) => (
            <MangaCard key={manga.manga_id} manga={manga} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {query ? 'Tidak ada hasil ditemukan' : 'Silakan masukkan kata kunci'}
          </h2>
          <p className="text-gray-500">
            {query
              ? `Tidak ada manga yang cocok dengan "${query}"`
              : 'Gunakan search bar untuk mencari manga favorit kamu'}
          </p>
        </div>
      )}
    </div>
  );
}
