// src/data/projects.ts

import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "presentation-tools",
    title: "Presentation Control Tool",
    subtitle: "Kontrol presentasi dengan gerakan tangan dan perintah suara menggunakan AI",
    category: "Computer Vision",
    image: "/projects/presentation.jpg",
    technologies: ["Python", "OpenCV", "MediaPipe", "Voice Recognition", "PyAutoGUI"],
    githubUrl: "https://github.com/rab781/Presentation-Tools",
    
    
    problem: "Presenter sering kesulitan mengontrol slide saat harus berdiri jauh dari laptop. Remote clicker konvensional memiliki keterbatasan jarak dan fitur. Dibutuhkan solusi hands-free yang lebih modern dan interaktif.",
    
    dataOverview: "Aplikasi menggunakan MediaPipe untuk hand tracking real-time dengan deteksi 21 landmarks per tangan. Voice recognition mendukung mode online (Google API) dan offline (Vosk) untuk bahasa Indonesia dan Inggris.",
    
    methodology: [
      "Computer Vision: Implementasi MediaPipe Hands untuk gesture detection 7 gerakan berbeda (swipe, palm, fist, thumbs, peace sign).",
      "Voice Recognition: Dual-mode system dengan Google Speech API dan Vosk offline model untuk reliability.",
      "Keyboard Simulation: PyAutoGUI untuk mengirim keyboard shortcuts ke berbagai aplikasi presentasi.",
      "Multi-Mode Operation: 3 mode operasi (Gesture Only, Voice Only, Hybrid) dengan real-time switching.",
    ],
    
    results: [
      "Berhasil mendeteksi 7 jenis gesture dengan akurasi >90% dalam kondisi cahaya normal.",
      "Voice recognition mendukung 15+ perintah suara dalam 2 bahasa dengan offline capability.",
      "Compatible dengan PowerPoint, Google Slides, PDF viewers, dan aplikasi presentasi lainnya.",
      "Real-time processing dengan FPS 30+ menggunakan optimasi threading dan debouncing."
    ]
  },
  {
    id: "image-restoration",
    title: "Image Restoration dengan Deep Learning",
    subtitle: "Menghilangkan noise dari gambar menggunakan HalfUNet Neural Network",
    category: "Deep Learning",
    image: "/projects/restoration.jpg",
    technologies: ["Python", "PyTorch", "Flask", "HalfUNet", "SIDD Dataset"],
    githubUrl: "https://github.com/rab781/restorasi-citra",
    
    problem: "Foto smartphone sering mengalami noise terutama dalam kondisi low-light. Traditional denoising methods seperti Gaussian blur menghilangkan detail penting. Dibutuhkan AI-based solution yang mampu mempertahankan edge dan texture.",
    
    dataOverview: "Menggunakan SIDD (Smartphone Image Denoising Dataset) dengan 160 scene instances. Dataset berisi pasangan noisy-clean images dengan resolusi tinggi yang di-crop menjadi patches 256x256 untuk training efficiency.",
    
    methodology: [
      "Model Architecture: HalfUNet dengan NAFBlock (Nonlinear Activation Free) untuk efisiensi komputasi.",
      "Training Strategy: Mixed precision training dengan early stopping, learning rate scheduling, dan data augmentation.",
      "Optimization: Implemented Quantum Annealing-inspired parameter tuning untuk optimal hyperparameters.",
      "Deployment: Flask web application dengan real-time inference dan optional sharpening post-processing.",
    ],
    
    results: [
      "Achieved PSNR 24.21 dB dan SSIM 0.5951 pada validation set dengan model size hanya ~12M parameters.",
      "Web app mampu process image 256x256 dalam 50-100ms pada GPU RTX 3080.",
      "Model berhasil mempertahankan edge sharpness sambil menghilangkan noise secara efektif.",
      "Support untuk multiple sharpening methods: Unsharp Mask, Laplacian, dan Adaptive Sharpening."
    ]
  },
  {
    id: "ecommerce-for-fish",
    title: "E-Commerce untuk Ikan Hias",
    subtitle: "Platform jual beli ikan hias premium dengan fitur lengkap untuk komunitas aquarist",
    category: "Full Stack Web Development",
    image: "/projects/ecommerce-for-fish",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Midtrans API", "RajaOngkir", "Alpine.js"],
    githubUrl: "https://github.com/rab781/WIB-FISH-FARM-website",
    demoUrl: "https://wib-fish-farm-website-production-d256.up.railway.app/",
    
    problem: "Platform e-commerce ikan hias memerlukan solusi lengkap yang menggabungkan katalog produk, sistem pembayaran terintegrasi, manajemen pesanan real-time, dan dashboard admin yang komprehensif. Dibutuhkan sistem yang dapat menangani kompleksitas bisnis aquaculture termasuk tracking pesanan, pengembalian produk, dan analitik penjualan.",
    
    dataOverview: "Platform WIB Fish Farm melayani komunitas pecinta ikan hias dengan katalog ribuan produk (Ikan Koi, Ikan Koki, dan spesies aquarium lainnya). Sistem mengelola ribuan transaksi, pelanggan dengan berbagai demografi geografis, dan inventory real-time dengan integrasi logistik RajaOngkir.",
    
    methodology: [
      "Architecture: Laravel 10 backend dengan Blade templating, Tailwind CSS untuk responsive design, dan Alpine.js untuk interaktivitas frontend.",
      "Authentication & Authorization: Sistem login multi-role (customer, admin) dengan permission-based access control.",
      "Payment Integration: Integrasi Midtrans untuk payment gateway yang aman mendukung berbagai metode pembayaran.",
      "Inventory Management: Real-time stock management dengan auto-update setelah pembelian dan low-stock alerts.",
      "Order System: Complete order lifecycle dari checkout, pembayaran, fulfillment, hingga return management.",
      "Shipping Integration: Integrasi RajaOngkir API untuk kalkulasi ongkir realtime berdasarkan lokasi.",
      "Dashboard Analytics: Admin dashboard dengan laporan penjualan, analytics produk, dan financial reporting dengan export Excel.",
    ],
    
    results: [
      "Platform fully functional dengan 8+ fitur customer utama: katalog browsing, shopping cart, checkout system, order tracking, review & rating, notifications, responsive design, dan return system.",
      "Admin dashboard dengan 8+ fitur manajemen: product management, user management, order processing, financial reports, sales analytics, expense tracking, dan diagnostic tools.",
      "Terintegrasi dengan payment gateway Midtrans dan shipping calculator RajaOngkir untuk pengalaman user yang seamless.",
      "Sistem otomasi termasuk auto-order expiration, automated email notifications, dan export laporan bulanan.",
      "Database schema yang robust dengan support untuk order timeline tracking, review verification, dan refund processing."
    ]
  },];

