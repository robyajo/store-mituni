# Activity Sync & Catatan Rilis (Wajib Setiap Selesai Tugas Pengguna)

AI WAJIB menjalankan alur ini setiap kali selesai mengerjakan tugas yang **dirasakan atau dilihat oleh pengguna** (fitur baru, perbaikan bug, perubahan perilaku, penyesuaian UI/UX, rilis, deploy, atau penghapusan fitur).

> **Pengecualian**: Refactoring murni internal, formatting, unit test internal, atau komentar kode yang tidak memiliki dampak ke pengguna tidak perlu dicatat.

---

## Alur Kerja Wajib (Setiap Selesai)

### 1. Buat / Perbarui Berkas Rilis Harian (`releases/YYYY-MM-DD-*.json`)
- Gunakan pedoman skill `release-notes` (`.agents/skills/activity-sync/release-notes/SKILL.md`).
- **Maksimal 1 berkas JSON per hari kerja**:
  - Periksa apakah berkas rilis untuk hari ini sudah ada (`releases/YYYY-MM-DD-*.json`).
  - Jika **sudah ada**: Tambahkan entri baru ke `items: [...]`, perbarui ringkasan `title` dan `body`, serta sesuaikan `type` (`important` > `feature` > `fix` > `improvement`).
  - Jika **belum ada**: Buat berkas baru `releases/YYYY-MM-DD-nama-singkat.json`.
- **Bahasa Dwibahasa (`id` + `en`)**:
  - `title.id` dan `title.en` (maksimal 80 karakter).
  - `body.id` dan `body.en` (1-2 kalimat narasi ringkasan).
  - `items`: array `{ type, id, en }` (tipe: `new`, `fix`, `improvement`, `security`, `removed`).
- **Gaya Bahasa Pelayanan Publik & Aman**:
  - **DILARANG KERAS** menyebut nama library/framework/package (misalnya Next.js, Radix, Tailwind, React, dsb.), nama database, file kode internal, atau istilah celah keamanan teknis.
  - Fokuskan narasi pada manfaat langsung, kemudahan, dan dampak bagi pengguna akhir.

### 2. Sinkronisasi ke API Portfolio (`POST /api/activities`)
- Baca kunci proyek `X-project` dari `.agents/skills/activity-sync/.ACTIVITY_PROJECT_KEYS`.
  - Proyek: `Store Mituni`
  - URL API: `https://ajoroby.is-a.dev/api/activities`
- Kirim berkas JSON rilis apa adanya via `POST` dengan menyertakan `"project": { "name": "Store Mituni" }`:
  ```bash
  curl -s -X POST "https://ajoroby.is-a.dev/api/activities" \
    -H "Content-Type: application/json" \
    -H "X-project: <KEY>" \
    -d "$(cat releases/YYYY-MM-DD-*.json)"
  ```
- Catat respons API (`201` untuk kegiatan baru, `200` untuk pembaruan rilis hari yang sama).

### 3. Verifikasi & Laporkan ke Pengguna
- Verifikasi hasil pengiriman:
  ```bash
  curl -s "https://ajoroby.is-a.dev/api/activities?slug=store-mituni&limit=3"
  ```
- Pastikan data tercatat tanpa duplikasi.
- Laporkan ID kegiatan, ringkasan judul/butir perubahan, dan status verifikasi kepada pengguna dalam balasan akhir.
