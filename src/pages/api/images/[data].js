import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

// Mock Cloudfront Image Handler
const handler = async (req, res) => {
  const { key, edits } = JSON.parse(Buffer.from(req.query.data, 'base64').toString())

  const generatedPath = path.join(process.cwd(), '.generated')

  const imagePath = key.startsWith('_next')
    ? key.replace('_next', path.join(process.cwd(), process.env.NEXT_PUBLIC_DIST_DIR || '.next'))
    : path.join(process.cwd(), 'public', key)
  let optimizedImagePath = path.join(generatedPath, 'images', req.query.data)

  // Check if the browser supports WebP format
  const supportsWebP = req.headers.accept.includes('image/webp')

  // Check if the input image has an alpha channel
  const { channels } = await sharp(imagePath).metadata()
  const hasAlphaChannel = channels === 4

  optimizedImagePath += hasAlphaChannel ? '.png' : '.jpg'

  if (!fs.existsSync(optimizedImagePath)) {
    // console.log('Generating optimized image:', optimizedImagePath)

    // Resize and optimize the image using sharp
    const pipeline = sharp(imagePath)

    if (edits) {
      if (edits.resize) pipeline.resize(edits.resize)
      if (edits.rotate) pipeline.rotate(edits.rotate)
      if (edits.flip) pipeline.flip()
      if (edits.flop) pipeline.flop()
      if (edits.sharpen) pipeline.sharpen(edits.sharpen)
      if (edits.median) pipeline.median(edits.median)
      if (edits.blur) pipeline.blur(edits.blur)
      if (edits.flatten) pipeline.flatten(edits.flatten)
      if (edits.gamma) pipeline.gamma(edits.gamma)
      if (edits.negate) pipeline.negate()
      if (edits.normalise || edits.normalize) pipeline.normalize()
      if (edits.clahe) pipeline.clahe(edits.clahe)
      if (edits.convolve) pipeline.convolve(edits.convolve)
      if (edits.threshold) pipeline.threshold(edits.threshold)
      if (edits.recomb) pipeline.recomb(edits.recomb)
      if (edits.modulate) pipeline.modulate(edits.modulate)
      if (edits.tint) pipeline.tint(edits.tint)
      if (edits.grayscale || edits.greyscale) pipeline.grayscale()
      if (edits.pipelineColorspace) pipeline.pipelineColorspace(edits.pipelineColorspace)
      if (edits.toColourspace || edits.toColorspace) pipeline.toColorspace(edits.toColourspace || edits.toColorspace)
      if (edits.removeAlpha) pipeline.removeAlpha()
      if (edits.ensureAlpha) pipeline.ensureAlpha(edits.ensureAlpha)
      if (edits.extractChannel) pipeline.extractChannel(edits.extractChannel)
      if (edits.bandbool) pipeline.bandbool(edits.bandbool)
    }

    if (supportsWebP) {
      pipeline.webp(edits && edits.webp ? edits.webp : { quality: 80 })
    } else if (hasAlphaChannel) {
      pipeline.png({ quality: 95 })
    } else {
      pipeline.jpeg({ quality: 80 })
    }

    fs.mkdirSync(path.join(generatedPath, 'images'), { recursive: true })

    await pipeline.toFile(optimizedImagePath)
  }

  // Read the optimized image file
  const optimizedImage = fs.readFileSync(optimizedImagePath)

  // Set the appropriate response headers
  res.setHeader('Cache-Control', 'public, max-age=31536000') // Cache the image for one year

  let type = 'image/jpeg'
  if (hasAlphaChannel && supportsWebP) type = 'image/webp'
  else if (hasAlphaChannel) type = 'image/png'

  res.setHeader('Content-Type', type)
  res.send(optimizedImage)
}

export default handler
