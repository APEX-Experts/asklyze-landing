# Video Optimization Guide for R2 Storage

## Current Implementation

All videos have been optimized with the `OptimizedVideo` component that includes:

- **Lazy Loading**: Videos only load when they're about to enter the viewport (200px before)
- **Intersection Observer**: Automatically pauses videos when out of view to save bandwidth
- **Preload Strategy**: Uses `preload="metadata"` for better initial load performance
- **Smart Autoplay**: Controlled autoplay that respects browser policies

## Best Practices for Video Compression

To significantly improve video loading speed, compress your videos before uploading to R2:

### Recommended Compression Settings

Use **FFmpeg** (free, open-source tool) to compress videos:

```bash
# High Quality (Recommended for hero videos)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4

# Medium Quality (Good balance for most videos)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k output.mp4

# Lower Quality (For background/small videos)
ffmpeg -i input.mp4 -c:v libx264 -crf 32 -preset fast -c:a aac -b:a 64k output.mp4
```

### Parameters Explained:
- **-crf**: Quality (18-28 recommended, lower = better quality, 23 is default)
- **-preset**: Encoding speed (slower = smaller file, use 'slow' for best compression)
- **-b:a**: Audio bitrate (128k for good quality, 96k for acceptable quality)

### Resolution Optimization

Scale down videos to appropriate sizes:

```bash
# Full HD (1080p) - For hero/main videos
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 -preset slow output.mp4

# HD (720p) - For most videos (Recommended)
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 -preset slow output.mp4

# Mobile optimized
ffmpeg -i input.mp4 -vf scale=854:480 -c:v libx264 -crf 28 -preset medium output_mobile.mp4
```

## Advanced: Multiple Video Formats

For best browser compatibility and performance, provide multiple formats:

```bash
# WebM (Better compression, modern browsers)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm

# H.265/HEVC (Best compression, newer devices)
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -preset medium output_h265.mp4
```

Then update the component to support multiple sources:

```tsx
<OptimizedVideo
    src="https://your-r2.dev/video.mp4"
    sources={[
        { src: "https://your-r2.dev/video.webm", type: "video/webm" },
        { src: "https://your-r2.dev/video.mp4", type: "video/mp4" }
    ]}
/>
```

## Cloudflare R2 Configuration

### Enable HTTP Caching Headers

Configure your R2 bucket to serve videos with proper cache headers:

1. Go to Cloudflare Dashboard → R2
2. Select your bucket
3. Add custom domain if not done
4. Enable Cloudflare CDN in front of R2

### Recommended Cache Settings (via Workers or Transform Rules):

```javascript
// Cache-Control header
Cache-Control: public, max-age=31536000, immutable
```

### R2 Custom Domain with Cloudflare CDN

Instead of using `pub-xxx.r2.dev`, use a custom domain with Cloudflare CDN:

1. **Add Custom Domain to R2**:
   - Go to R2 bucket settings
   - Add custom domain: `videos.yourdomain.com`
   - Point DNS to Cloudflare

2. **Enable Caching**:
   - Videos will be cached at Cloudflare edge locations
   - Much faster delivery worldwide
   - Reduced R2 bandwidth costs

3. **Update video URLs**:
   ```tsx
   // Before
   src="https://pub-676e1cb87e8247329da59049363213c6.r2.dev/video.mp4"

   // After (with CDN)
   src="https://videos.yourdomain.com/video.mp4"
   ```

## Expected Performance Improvements

With these optimizations:

- **80-90% smaller file sizes** (from compression)
- **3-5x faster initial load** (from lazy loading + compression)
- **Reduced bandwidth costs** (50-70% less data transfer)
- **Better mobile experience** (adaptive loading)

## Tools

### Compression Tools:
- **FFmpeg** (CLI): https://ffmpeg.org/download.html
- **HandBrake** (GUI): https://handbrake.fr/
- **Cloudinary** (Cloud service): https://cloudinary.com/

### Testing:
- Check video file size: Should be <2MB for short clips, <10MB for longer videos
- Test loading speed: Use Chrome DevTools Network tab
- Mobile testing: Use throttling (Slow 3G) to verify performance

## Current Video Locations

Update these videos with compressed versions:

1. `ReportBuilder.mp4` - Used in Hero and ContentSplit
2. `tables.mp4` - WorkingProcess step 1
3. `configuration.mp4` - WorkingProcess step 2
4. `AIGeneration.mp4` - WorkingProcess step 3
5. `plugin.mp4` - ContentSplit section 1
6. `first1.mp4` - TabbedShowcase tab 1
7. `step2.mp4` - TabbedShowcase tab 2
8. `step3.mp4` - TabbedShowcase tab 3
9. `step4.mp4` - TabbedShowcase tab 4

## Quick Win: Compress All Videos Now

Run this batch script to compress all your videos:

```bash
#!/bin/bash
for file in *.mp4; do
    ffmpeg -i "$file" -vf scale=1280:720 -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 96k "optimized_${file}"
done
```

This will create compressed versions of all videos with "optimized_" prefix.
