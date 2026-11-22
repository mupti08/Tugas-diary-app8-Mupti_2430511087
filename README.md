# Diary App 8 (React Native + Redux Toolkit)

Aplikasi Diary berbasis React Native, Expo Router, Redux Toolkit, dan React-Redux untuk Modul Praktikum 08 Mobile Programming.

## Fitur Tugas Praktikum
- **Edit Diary (`editDiary` & `app/edit/[id].tsx`)**: Memperbarui `title`, `body`, `preview`, dan `mood` langsung ke Redux Store.
- **Filter Mood**: Menyaring catatan diary berdasarkan mood pada halaman Home.
- **Statistik**: Menampilkan kartu **Total Diary** dan **Total Favorite** secara *real-time* dari Redux Store.
- **Clear All Favorites (`clearAllFavorites`)**: Membersihkan seluruh status favorit sekaligus dari halaman Favorites.
- **Validasi Input**: Judul wajib diisi dan minimal 3 karakter pada form Tambah maupun Edit.
- **Empty State Informatif**: Tampilan khusus ketika daftar diary, hasil filter mood, atau daftar favorit kosong.

## Perbedaan Local State, Global Redux State, dan Persistent Database

| Aspek | Local State (`useState`) | Global Redux State (Redux Toolkit) | Persistent Database (MySQL / SQLite / API) |
| :--- | :--- | :--- | :--- |
| **Cakupan Data** | Hanya dapat diakses oleh satu komponen atau satu screen tempat state dibuat. | Terpusat dalam satu Store (*single source of truth*) sehingga bisa dibaca dan diubah lintas screen secara sinkron. | Tersimpan di luar memori aplikasi (server atau storage lokal) dan dapat diakses lintas sesi maupun perangkat. |
| **Media Penyimpanan** | Memori sementara (RAM) milik komponen aktif. | Memori sementara (RAM) di tingkat aplikasi selama aplikasi berjalan. | Media penyimpanan permanen (disk/database server). |
| **Persistensi Data** | Hilang saat komponen di-*unmount* atau screen ditutup. | Hilang dan kembali ke `initialState` saat aplikasi di-*reload* atau di-*restart*. | Tetap tersimpan secara permanen meskipun aplikasi ditutup atau perangkat dimatikan. |
| **Contoh di Diary App** | Isi input sementara `title`, `body`, dan `mood` di `create.tsx` serta `edit/[id].tsx`. | Daftar `entries`, status `liked`, dan `moodFilter` yang dipakai bersama oleh Home, Detail, Edit, dan Favorites. | Penyimpanan permanen seluruh catatan diary pengguna melalui REST API dan database pada pertemuan berikutnya. |

## Cara Menjalankan
```bash
npm install
npx expo start -c
