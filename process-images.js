const sharp = require('sharp');

async function removeBlack(input, output, threshold) {
  try {
    const { data, info } = await sharp(input)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] <= threshold && data[i+1] <= threshold && data[i+2] <= threshold) {
        data[i+3] = 0;
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toFile(output);
    console.log('Processed', output);
  } catch(e) {
    console.error(e);
  }
}

removeBlack("public/assets/logo.png", "public/assets/logo-transparent.png", 25);
removeBlack("public/assets/lion-silhouettes.png", "public/assets/lion-silhouettes-transparent.png", 20);
removeBlack("public/assets/usa-stamp.png", "public/assets/usa-stamp-transparent.png", 20);
removeBlack("public/assets/3_pack.png", "public/assets/3_pack-transparent.png", 20);
removeBlack("public/assets/6_pack.png", "public/assets/6_pack-transparent.png", 20);