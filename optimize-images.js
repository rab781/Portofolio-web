const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'projects');
const outputDir = path.join(__dirname, 'public', 'projects', 'optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
    const files = fs.readdirSync(projectsDir);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(projectsDir, file);
            const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

            console.log(`Optimizing ${file}...`);

            await sharp(inputPath)
                .resize(1200, null, { withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(outputPath);

            console.log(`Saved to ${outputPath}`);
        }
    }
}

optimizeImages().catch(console.error);
