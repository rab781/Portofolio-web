# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional, and responsive design
- **Next.js 15**: Built with the latest Next.js App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Smooth Animations**: Beautiful transitions and hover effects
- **SEO Optimized**: Meta tags and semantic HTML for better search rankings

## 📋 Sections

- **Hero**: Eye-catching landing section with animated text
- **About**: Personal introduction and background
- **Skills**: Technical skills with progress bars
- **Projects**: Showcase of featured and other projects
- **Contact**: Contact form and information

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Geist Sans & Geist Mono

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Personal Information

Update the following components with your personal information:

1. **Hero Section** (`src/components/Hero.tsx`):
   - Change name and titles
   - Update social media links
   - Modify the animated text array

2. **About Section** (`src/components/About.tsx`):
   - Update personal description
   - Change the avatar/image
   - Modify background information

3. **Skills Section** (`src/components/Skills.tsx`):
   - Update skill categories and levels
   - Add or remove technologies

4. **Projects Section** (`src/components/Projects.tsx`):
   - Replace with your actual projects
   - Update project descriptions, technologies, and links

5. **Contact Section** (`src/components/Contact.tsx`):
   - Update contact information
   - Configure form handling (currently console logs)

### Styling

- Colors and themes can be customized in `tailwind.config.ts`
- Global styles are in `src/app/globals.css`
- Component-specific styles use Tailwind classes

### Fonts

The project uses Geist fonts. You can change fonts in `src/app/layout.tsx`.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── About.tsx
    ├── Contact.tsx
    ├── Hero.tsx
    ├── Navigation.tsx
    ├── Projects.tsx
    └── Skills.tsx
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📧 Contact Form

The contact form currently logs submissions to the console. To make it functional:

1. Set up a backend API endpoint
2. Configure email service (e.g., EmailJS, SendGrid)
3. Update the form submission handler in `Contact.tsx`

## 🎨 Customization Tips

1. **Colors**: Modify the color scheme in Tailwind config
2. **Animations**: Add custom animations using Tailwind or CSS
3. **Images**: Add your photos and project screenshots to the `public` folder
4. **Content**: Update all placeholder content with your information
5. **SEO**: Update metadata in `layout.tsx` for better SEO

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

---

**Happy coding! 🚀**
