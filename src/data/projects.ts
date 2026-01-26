import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "coffee-leaf-detection",
    title: "Coffee Leaf Disease Detection",
    subtitle: "Automated plant disease detection using Deep Learning (EfficientNet & MobileNet).",
    category: "Deep Learning",
    image: "/projects/coffee.jpg",
    technologies: ["Python", "TensorFlow", "EfficientNet", "MobileNet", "Transfer Learning"],
    githubUrl: "https://github.com/rab781/Deteksi-Daun-kopi",

    problem: "Coffee farmers struggle with early diagnosis of leaf diseases like Miner, Phoma, and Rust, leading to crop loss. Manual inspection is slow and expertise-dependent. An automated, accurate, and mobile-friendly solution is needed.",

    dataOverview: "Dataset contains thousands of coffee leaf images augmented with rotation, zoom, and flip techniques. Classes: Healthy, Miner, Rust, Phoma. Balanced using data augmentation to ensure robust model performance.",

    methodology: [
      "Comparative Analysis: Evaluated 8 architectures including EfficientNet (B0-B2), MobileNetV2, and DenseNet.",
      "Transfer Learning: Utilized ImageNet pretrained weights, freezing base layers and fine-tuning top dense layers.",
      "Optimization: Adam optimizer with categorical crossentropy loss and early stopping to prevent overfitting.",
      "Deployment Strategy: Selected MobileNetV2 for its optimal balance of accuracy and inference speed for potential mobile deployment."
    ],

    results: [
      "Achieved high classification accuracy across all 4 disease categories.",
      "EfficientNetB0 showed the fastest convergence during training.",
      "MobileNetV2 proved most suitable for edge devices due to low parameter count (~2.2M) while maintaining competitive accuracy.",
      "Robustness against varying lighting conditions demonstrated through test set validation."
    ]
  },
  {
    id: "fraud-detection",
    title: "Fraud & Online Gamble Detection",
    subtitle: "Advanced anomaly detection system for financial transactions and gambling patterns.",
    category: "Data Science & Security",
    image: "/projects/fraud.jpg",
    technologies: ["Python", "Scikit-Learn", "Pandas", "XGBoost", "Anomaly Detection"],
    githubUrl: "https://github.com/rab781/Fraud-and-Online-gamble-Detection",

    problem: "The rise of digital transactions has led to sophisticated fraud and illegal online gambling activities. Traditional rule-based systems often miss subtle patterns. Financial institutions need a dynamic AI model to flag suspicious activities in real-time.",

    dataOverview: "Analyzed transactional datasets containing features like transaction amount, location, time, frequency, and merchant category. Data preprocessing involved handling imbalance using SMOTE and feature scaling.",

    methodology: [
      "Data Preprocessing: Cleaning, normalization, and handling missing values in high-volume transaction logs.",
      "Feature Engineering: Created time-based features and behavioral profiles for users.",
      "Model Training: Implemented Random Forest and XGBoost classifiers to detect fraud patterns.",
      "Validation: Used Precision-Recall curves instead of just accuracy due to the highly imbalanced nature of fraud data."
    ],

    results: [
      "Successfully identified key indicators of online gambling transactions.",
      "Reduced false positives significantly compared to baseline methods.",
      "Model provides interpretability features to explain why a transaction was flagged.",
      "High recall rate ensuring most fraudulent activities are caught."
    ]
  },
  {
    id: "presentation-tools",
    title: "AI Presentation Controller",
    subtitle: "Hands-free presentation control using Computer Vision hand gesture recognition.",
    category: "Computer Vision",
    image: "/projects/presentation.jpg",
    technologies: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "Voice Recognition"],
    githubUrl: "https://github.com/rab781/Presentation-Tools",

    problem: "Presenters often feel tethered to their laptops or clickers. Physical remotes can fail or be lost. A natural user interface using hand gestures offers a modern, engaging, and hardware-free alternative for controlling slides.",

    dataOverview: "Real-time video stream input processed to detect 21 hand landmarks per hand using MediaPipe. Audio input processed for voice command triggers.",

    methodology: [
      "Hand Tracking: Utilized MediaPipe Hands for robust real-time landmark detection.",
      "Gesture Logic: Defined geometric rules to recognize 'Open Palm' (Next), 'Fist' (Previous), and 'Pointer' (Laser) gestures.",
      "Voice Control: Integrated Google Speech API and Vosk for offline voice commands as a backup.",
      "Action Mapping: Mapped detected intents to keyboard events using PyAutoGUI to control PowerPoint/PDF readers."
    ],

    results: [
      "Achieved >90% gesture recognition accuracy in real-time (30+ FPS) on standard webcams.",
      "Seamless control of slides without any physical device.",
      "Hybrid mode allows switching between voice and gesture control instantly.",
      "Robust to background clutter and varying lighting conditions."
    ]
  },
  {
    id: "image-restoration",
    title: "Deep Image Restoration",
    subtitle: "Restoring noisy and degraded images using advanced Neural Networks (HalfUNet).",
    category: "Deep Learning",
    image: "/projects/restoration.jpg",
    technologies: ["Python", "PyTorch", "HalfUNet", "Flask", "Image Processing"],
    githubUrl: "https://github.com/rab781/restorasi-citra",

    problem: "Low-light photography often results in grainy, noisy images. Standard filters blur detail. The goal was to build a Deep Learning model that denoises images while preserving sharp edges and fine textures.",

    dataOverview: "Used the SIDD (Smartphone Image Denoising Dataset) containing pairs of noisy and ground-truth clean images. Patched into 256x256 crops for training.",

    methodology: [
      "Architecture: Implemented HalfUNet with NAFBlock (Nonlinear Activation Free) for efficient feature extraction.",
      "Training: Mixed precision training with AdamW optimizer and cosine annealing scheduler.",
      "Loss Function: Combination of L1 pixel loss and MS-SSIM to ensure structural fidelity.",
      "Web Interface: Deployed model via Flask for easy user interaction and testing."
    ],

    results: [
      "PSNR of 24.21 dB and SSIM of 0.5951 on validation set.",
      "Model effectively removes noise while keeping text and edges sharp.",
      "Inference time of ~100ms per image on GPU.",
      "Outperforms traditional Gaussian and Median filters in visual quality."
    ]
  }
];
