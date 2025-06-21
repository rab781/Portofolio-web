// Contoh perbedaan kode antara framework

// ==========================================
// 1. ROUTING COMPARISON
// ==========================================

// NEXT.JS (File-based routing)
// File: app/products/[id]/page.tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  return <div>Product ID: {params.id}</div>
}
// URL: /products/123 → Automatic routing!

// REACT + REACT ROUTER
// Manual setup required
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  return <div>Product ID: {id}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// ==========================================
// 2. DATA FETCHING COMPARISON
// ==========================================

// NEXT.JS (Server-side)
export default async function HomePage() {
  // Runs on server, SEO-friendly
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// REACT (Client-side)
import { useState, useEffect } from 'react';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Runs in browser, not SEO-friendly
    fetch('https://api.example.com/posts')
      .then(r => r.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// ==========================================
// 3. API ROUTES COMPARISON
// ==========================================

// NEXT.JS (Built-in API)
// File: app/api/users/route.ts
export async function GET() {
  const users = await db.users.findMany();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.users.create({ data: body });
  return Response.json(user);
}

// REACT (Separate backend needed)
// You need Express.js, Fastify, or other backend
// app.js (Express server)
const express = require('express');
const app = express();

app.get('/api/users', async (req, res) => {
  const users = await db.users.findMany();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await db.users.create({ data: req.body });
  res.json(user);
});

// ==========================================
// 4. SEO COMPARISON
// ==========================================

// NEXT.JS (Automatic SEO)
export const metadata = {
  title: 'My Portfolio',
  description: 'Full Stack Developer Portfolio',
  openGraph: {
    title: 'My Portfolio',
    description: 'Full Stack Developer Portfolio',
    images: ['/portfolio-image.jpg'],
  },
};

export default function HomePage() {
  return <div>Content is pre-rendered for SEO!</div>;
}

// REACT (Manual SEO)
import { Helmet } from 'react-helmet';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>My Portfolio</title>
        <meta name="description" content="Full Stack Developer Portfolio" />
        <meta property="og:title" content="My Portfolio" />
        <meta property="og:description" content="Full Stack Developer Portfolio" />
        <meta property="og:image" content="/portfolio-image.jpg" />
      </Helmet>
      <div>Content loads after JavaScript runs</div>
    </>
  );
}

// ==========================================
// 5. PERFORMANCE COMPARISON
// ==========================================

// NEXT.JS (Optimized by default)
import Image from 'next/image';

export default function Gallery() {
  return (
    <div>
      {/* Automatic optimization, lazy loading, WebP conversion */}
      <Image 
        src="/photo.jpg" 
        alt="Photo" 
        width={800} 
        height={600}
        priority // For above-the-fold images
      />
    </div>
  );
}

// REACT (Manual optimization needed)
import { useState, useEffect, useRef } from 'react';

function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    // Manual intersection observer for lazy loading
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {isVisible && (
        <img 
          src="/photo.jpg" 
          alt="Photo" 
          loading="lazy"
          // Manual WebP support detection needed
        />
      )}
    </div>
  );
}
