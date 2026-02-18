import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "road-damage-detection",
    title: "Road Damage Detection",
    subtitle: "Automated road damage detection system using YOLOv8 with 91% accuracy.",
    category: "Deep Learning",
    image: "/projects/optimized/restoration.webp", // Using restoration image as conceptually similar
    technologies: ["Python", "YOLOv8", "Deep Learning", "Computer Vision", "RDD Dataset"],
    githubUrl: "https://github.com/rab781", // Linking to profile as specific repo wasn't in OCR, or can use placeholder

    problem: "Manual inspection of road infrastructure is labor-intensive, slow, and prone to human error. To maintain smart city infrastructure efficiently, authorities need an automated system capable of detecting road defects in real-time from visual data.",

    dataOverview: "Utilized the RDD 2022 Japan dataset. Performed extensive data preprocessing including parsing and formatting to standardize bounding boxes for optimal model training.",

    methodology: [
      "Algorithm Selection: Implemented YOLOv8 (You Only Look Once) for its state-of-the-art real-time object detection capabilities.",
      "Data Preprocessing: Applied rigorous parsing and formatting to ensure consistent bounding box annotations across the dataset.",
      "Model Training: Trained the model on the preprocessed dataset, optimizing for both precision and recall.",
      "Validation: rigorous testing to ensure robustness across various road conditions."
    ],

    results: [
      "Achieved 91% accuracy in detecting road damage types.",
      "Developed a robust preprocessing pipeline for standardizing input data.",
      "Model is ready for implementation in smart infrastructure monitoring systems.",
      "Demonstrated potential for significant cost reduction in road maintenance."
    ]
  },
  {
    id: "coffee-leaf-detection",
    title: "Coffee Leaf Disease Detection",
    subtitle: "Comparative study of CNN architectures for plant disease classification.",
    category: "AI Research",
    image: "/projects/optimized/coffee.webp",
    technologies: ["Python", "TensorFlow", "CNN", "DenseNet", "EfficientNet", "MobileNet"],
    githubUrl: "https://github.com/rab781/Deteksi-Daun-kopi",

    problem: "Early diagnosis of coffee leaf diseases is critical for crop yield but manual identification requires expertise and is difficult to scale. This research aimed to identify the most effective CNN architecture for automated disease classification.",

    dataOverview: "Dataset divided into 80:10:10 split for training, validation, and testing. Collaborated with domain experts to ensure data quality.",

    methodology: [
      "Model Selection: Developed and trained 7 variations of CNN models including DenseNet, EfficientNet, and MobileNet.",
      "Collaboration: Worked closely with university lecturers to align technical development with agricultural requirements.",
      "Evaluation: Used ROC curves to rigorously evaluate and compare the performance of each model variation.",
      "Selection: Identified the top 3 performing models for the final inference stage."
    ],

    results: [
      "Successfully identified 3 optimal models for high-precision disease diagnosis.",
      "Provided a precise diagnostic solution ready for potential field application.",
      "Demonstrated the effectiveness of transfer learning in agricultural contexts.",
      "Research contributed to the understanding of model performance on agricultural datasets."
    ]
  },
  {
    id: "rab-trade-bot",
    title: "RabTradeBot",
    subtitle: "Real-time crypto trading assistant integrated with Binance API.",
    category: "Personal Project",
    image: "/projects/optimized/dashboard.webp", // Using dashboard image as relevant for trading
    technologies: ["Python", "Binance API", "Telegram API", "Mobile Responsive", "Bot Architecture"],
    githubUrl: "https://github.com/rab781",

    problem: "Crypto markets operate 24/7, making it impossible for traders to monitor them constantly. Missing critical price movements can lead to lost opportunities. A mobile-accessible, automated notification system was required.",

    dataOverview: "Real-time market data streaming from Binance API. Processed price tickers and volume indicators.",

    methodology: [
      "API Integration: Built a robust integration with Binance API to fetch real-time market data.",
      "Bot Architecture: Designed a responsive Telegram bot architecture to deliver signals directly to mobile devices.",
      "Signal Logic: Implemented logic to filter noise and identify significant trading signals.",
      "User Interface: Focused on a text-based, low-latency interface for immediate information access."
    ],

    results: [
      "Enables real-time monitoring of crypto assets without opening exchange apps.",
      "Provides instant trade signals, ensuring no critical market moves are missed.",
      "Responsive mobile design allows for on-the-go portfolio management.",
      "Stable and reliable uptime for continuous market surveillance."
    ]
  },
  {
    id: "my-anemone-laundry",
    title: "MyAnemone System",
    subtitle: "Full-stack laundry management system with comprehensive admin features.",
    category: "Full Stack Dev",
    image: "/projects/optimized/ecommerce.webp", // Using ecommerce/business image
    technologies: ["SQL", "Web Framework", "ERD Design", "Database Management", "Full Stack"],
    githubUrl: "https://github.com/rab781",

    problem: "Manual transaction recording in laundry businesses is inefficient, prone to errors, and makes financial tracking difficult. The business needed a digitized solution to streamline operations.",

    dataOverview: "modeled complex business entities including customers, orders, services, and transaction status in a relational database.",

    methodology: [
      "Database Design: Designed a complex Entity Relationship Diagram (ERD) to accurately map business flows.",
      "Admin Features: Built a complete admin panel including Login, Order Status Updates, and Reporting modules.",
      "Full Stack Development: integrated a SQL database with a responsive web framework.",
      "Digitization: Transformed manual pen-and-paper operational workflows into a digital system."
    ],

    results: [
      "Significantly increased efficiency in recording laundry transactions.",
      "Eliminated manual data entry errors.",
      "Provided business owners with clear, real-time insights into operations.",
      "Delivered a fully functional, end-to-end management solution."
    ]
  }
];
