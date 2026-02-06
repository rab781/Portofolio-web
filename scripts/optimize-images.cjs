const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const certificatesDir = './public/certificates';
const outputDir = './public/certificates/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PNG files
const files = fs.readdirSync(certificatesDir).filter(f => f.endsWith('.png'));

async function optimizeImages() {
    console.log(`Found ${files.length} PNG files to optimize...`);

    for (const file of files) {
        const inputPath = path.join(certificatesDir, file);
        const outputName = file.replace('.png', '.webp');
        const outputPath = path.join(outputDir, outputName);

        try {
            const metadata = await sharp(inputPath).metadata();
            console.log(`Processing: ${file} (${metadata.width}x${metadata.height})`);

            await sharp(inputPath)
                .resize(800, 600, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 85 })
                .toFile(outputPath);

            const originalStats = fs.statSync(inputPath);
            const optimizedStats = fs.statSync(outputPath);
            const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

            console.log(`  ✓ ${file} → ${outputName}`);
            console.log(`    ${(originalStats.size / 1024).toFixed(1)}KB → ${(optimizedStats.size / 1024).toFixed(1)}KB (${reduction}% reduction)`);
        } catch (error) {
            console.error(`  ✗ Error processing ${file}:`, error.message);
        }
    }

    console.log('\nDone! Optimized images saved to:', outputDir);
}

optimizeImages();
