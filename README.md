# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


pada projek untuk frend silahkan jalan kan dahulu npm run dev

💻 FRONTEND
⚙️ Teknologi
React JS

Tailwind CSS

Axios (untuk komunikasi dengan API)

State Management: zustand (manajemen state yang ringan dan efisien)

🎨 Fitur yang Sudah Selesai (Slicing UI)
✅ Dashboard

✅ Stock

✅ Customer

✅ Purchase

✍️ Fitur Interaktif
✅ Tambah Customer

✅ Tambah Barang

✅ Penggunaan zustand untuk:

Manajemen global state customer

Menyimpan data transaksi

Menangani kondisi loading/error tanpa prop drilling

📡 Integrasi API
Semua halaman yang memerlukan data dinamis telah terhubung dengan API backend menggunakan Axios, termasuk:

Menampilkan daftar customer dan transaksi

Menambahkan data customer

Menambahkan barang/produk ke dalam sistem

Menampilkan data stock dan pembelian

