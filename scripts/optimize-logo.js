const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/betapower_logo.png');
const outputPath = path.join(__dirname, '../public/images/betapower_logo_optimized.png');

async function optimizeLogo() {
  try {
    // Read the original image to check dimensions
    const metadata = await sharp(inputPath).metadata();
    console.log(`Original: ${metadata.width}x${metadata.height}, ${metadata.format}, ${(fs.statSync(inputPath).size / 1024).toFixed(2)} KB`);
    
    // Resize to reasonable size for 40px display (2x for retina = 80px)
    // Using a max of 200px width to be safe for all uses
    await sharp(inputPath)
      .resize(200, null, { // Width 200px, height auto
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({ 
        quality: 90,
        compressionLevel: 9,
        palette: true // Use palette-based PNG if possible
      })
      .toFile(outputPath);
    
    const outputSize = fs.statSync(outputPath).size;
    const outputMetadata = await sharp(outputPath).metadata();
    console.log(`Optimized: ${outputMetadata.width}x${outputMetadata.height}, ${(outputSize / 1024).toFixed(2)} KB`);
    console.log(`Reduction: ${((1 - outputSize / fs.statSync(inputPath).size) * 100).toFixed(1)}%`);
    
    // Backup original and replace
    const backupPath = path.join(__dirname, '../public/images/betapower_logo_original.png');
    fs.copyFileSync(inputPath, backupPath);
    fs.copyFileSync(outputPath, inputPath);
    fs.unlinkSync(outputPath);
    
    console.log('✓ Logo optimized successfully!');
    console.log(`✓ Original backed up to: betapower_logo_original.png`);
  } catch (error) {
    console.error('Error optimizing logo:', error);
    process.exit(1);
  }
}

optimizeLogo();
