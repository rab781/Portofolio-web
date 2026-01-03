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
    demoUrl: null,
    
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
    demoUrl: null,
    
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
    id: "ecommerce-dashboard",
    title: "E-Commerce Analytics Dashboard",
    subtitle: "Interactive dashboard untuk analisis performa penjualan dan customer behavior",
    category: "Data Analytics",
    image: "/projects/dashboard.jpg",
    technologies: ["Python", "Streamlit", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/rab781/Latihan-Program",
    demoUrl: null,
    
    problem: "E-commerce membutuhkan insight cepat tentang daily orders, product performance, dan customer demographics. Data mentah sulit diinterpretasi tanpa visualisasi yang proper dan interactive filtering.",
    
    dataOverview: "Dataset e-commerce dengan informasi orders, customers, products mencakup 100K+ transactions. Data mencakup order dates, customer demographics (gender, age, state), dan purchase behavior dari periode 2020-2021.",
    
    methodology: [
      "Data Cleaning: Preprocessing datetime columns, handling missing values, dan data type conversion.",
      "Feature Engineering: Membuat age groups, calculating daily metrics, dan RFM (Recency, Frequency, Monetary) analysis.",
      "Interactive Dashboard: Streamlit dengan date range filter, multiple visualizations, dan real-time metric calculations.",
      "RFM Analysis: Segmentasi customer berdasarkan recency order, frequency pembelian, dan total monetary value.",
    ],
    
    results: [
      "Dashboard menampilkan 10+ key metrics dengan interactive date filtering dan auto-refresh.",
      "Identified top 5 best/worst performing products dengan clear visual comparisons.",
      "Customer segmentation berdasarkan demographics (gender, age, state) untuk targeted marketing.",
      "RFM analysis mengidentifikasi top customers dengan avg recency, frequency, dan monetary metrics."
    ]
  },];

