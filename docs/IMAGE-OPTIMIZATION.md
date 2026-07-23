# Image Optimization Recommendations

No image files were converted or removed during the static product-page implementation.

## Current Findings

- Most collection images are 3664 × 2691 PNG files between roughly 180 KB and 910 KB.
- Hero images are also 3664 × 2691 PNG files and range from roughly 1.6 MB to 4.2 MB.
- Heritage images are approximately 2.2-2.6 MB.
- Product pages now provide explicit dimensions, eager loading for the main image, and lazy loading for related products.

## Recommended Follow-Up

1. Produce AVIF and WebP derivatives while preserving original PNG files.
2. Generate at least 640, 960, 1440, and 2200 pixel widths.
3. Use `<picture>` and `srcset` so mobile devices do not download desktop originals.
4. Keep transparent backgrounds when required by product cutouts.
5. Target approximately 150-350 KB for large hero images and below 150 KB for catalog thumbnails where quality permits.
6. Preload only the first hero image; lazy-load or defer later slideshow images.
7. Measure LCP and total transfer size before and after conversion.

Do not delete the source assets until the optimized files have been visually compared against the originals on dark backgrounds and with the product-page image zoom.
