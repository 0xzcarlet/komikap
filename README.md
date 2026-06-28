# Web Komik (Next.js)

Proyek ini merupakan sebuah aplikasi web sederhana yang menampilkan daftar komik, detail seri dan halaman baca chapter menggunakan API publik dari **Shinigami** (seperti yang digunakan oleh 09.shinigami.asia). Aplikasi dibangun dengan Next.js versi **app router** dan menggunakan Tailwind CSS untuk tampilan yang modern dan responsif.

## Fitur

- Menampilkan daftar seri rekomendasi dan daftar top pada halaman beranda.
- Detail seri lengkap dengan gambar sampul, deskripsi, genre, dan daftar chapter.
- Halaman baca chapter dengan gambar per halaman yang di‐optimize melalui `next/image`.
- Loading skeleton halus pada halaman detail seri dan chapter untuk pengalaman pengguna yang lebih baik saat menunggu data.
- Konfigurasi domain API menggunakan environment variable sehingga mudah diubah tanpa modifikasi kode.

## Struktur Proyek

- `app/`
  - `layout.tsx` – Struktur global halaman, termasuk header dan footer.
  - `page.tsx` – Halaman beranda yang menampilkan seri rekomendasi dan top.
  - `manga/[mangaId]/` – Route dinamis untuk detail seri.
    - `page.tsx` – Menampilkan detail seri dan daftar chapter.
    - `loading.tsx` – Skeleton saat data detail seri sedang dimuat.
  - `chapter/[chapterId]/` – Route dinamis untuk membaca chapter.
    - `page.tsx` – Menampilkan daftar gambar halaman.
    - `loading.tsx` – Skeleton saat data chapter sedang dimuat.
  - `components/` – Komponen reusable seperti `MangaCard` dan `LoadingSkeleton`.
- `next.config.js` – Konfigurasi Next.js, termasuk izin domain gambar dari API.
- `tailwind.config.js` dan `postcss.config.js` – Konfigurasi Tailwind CSS.
- `.env.local.example` – Contoh konfigurasi environment variable.

## Menjalankan Proyek

1. Pastikan Anda memiliki **Node.js** dan **npm** terpasang.
2. Instal dependensi:

   ```bash
   npm install
   ```

3. Salin berkas `.env.local.example` menjadi `.env.local` dan sesuaikan `NEXT_PUBLIC_API_BASE_URL` jika diperlukan:

   ```bash
   cp .env.local.example .env.local
   # Edit .env.local jika base URL API berbeda
   ```

4. Jalankan mode pengembangan:

   ```bash
   npm run dev
   ```

5. Buka browser di `http://localhost:3000` untuk melihat aplikasinya.

## Catatan

- Aplikasi ini memanfaatkan API publik tanpa autentikasi, sehingga fitur seperti histori baca dan readlist yang membutuhkan token belum diimplementasikan.
- Bila API berubah (misalnya skema respons atau parameter), Anda mungkin perlu menyesuaikan kode di fungsi `getHomeData`, `getData` dan `getChapter`.

Selamat menikmati membaca komik!