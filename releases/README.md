# Catatan Rilis — Store Mituni

Direktori ini menyimpan berkas rilis harian (`YYYY-MM-DD-*.json`) untuk **Store Mituni**.

## Aturan:
1. **Maksimal 1 berkas per hari kerja** (`releases/YYYY-MM-DD-*.json`).
2. Jika sudah ada berkas hari ini, perbarui dengan menambahkan item baru ke `items: [...]`.
3. Format dwibahasa (`id` dan `en`), bahasa pelayanan publik yang berfokus pada manfaat pengguna tanpa menyebut pustaka internal/teknis.
4. Setiap selesai perubahan pengguna, kirim ke API portfolio via skill `activity-sync`.
