// Contoh struktur routing

// VITE + REACT (Manual Setup)
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

// NEXT.JS (File-based Routing)
// app/page.tsx -> "/"
// app/about/page.tsx -> "/about"
// app/contact/page.tsx -> "/contact"
// No additional setup needed!
