# Video del hero

`hero.webm` (VP9) y `hero.mp4` (H.264) salen de `public/images/gallery2026/IMG_7996.MOV` (1920×1080, 8,6 s,
HEVC en HDR HLG, ignorado por git). Se pasan a SDR BT.709, sin audio, a 1920 px, con dos pasadas para quedar
en 2–3 MB cada uno.

Comando (ffmpeg 9, build "full" de gyan.dev, que trae zscale):

```bash
IN=public/images/gallery2026/IMG_7996.MOV
VF="zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,scale=1920:-2:flags=lanczos"
COL="-color_primaries bt709 -color_trc bt709 -colorspace bt709"

# MP4 H.264
ffmpeg -y -i $IN -an -vf "$VF" -c:v libx264 -preset slow -b:v 2600k -maxrate 3800k -bufsize 5200k -pass 1 -profile:v high -pix_fmt yuv420p $COL -f mp4 NUL
ffmpeg -y -i $IN -an -vf "$VF" -c:v libx264 -preset slow -b:v 2600k -maxrate 3800k -bufsize 5200k -pass 2 -profile:v high -pix_fmt yuv420p $COL -movflags +faststart public/videos/hero.mp4

# WebM VP9
ffmpeg -y -i $IN -an -vf "$VF" -c:v libvpx-vp9 -b:v 2300k -maxrate 3400k -row-mt 1 -deadline good -cpu-used 2 -pass 1 $COL -f webm NUL
ffmpeg -y -i $IN -an -vf "$VF" -c:v libvpx-vp9 -b:v 2300k -maxrate 3400k -row-mt 1 -deadline good -cpu-used 1 -pass 2 $COL public/videos/hero.webm
```

## Versión del teléfono

`hero-movil.webm` y `hero-movil.mp4` son un recorte vertical del mismo video (608 × 1080 desde x = 600, donde
quedan las bailarinas del centro), escalado a 540 × 960: menos de 1 MB cada uno. El hero los carga por debajo de
768 px de ancho.

```bash
VFM="zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,crop=608:1080:600:0,scale=540:960:flags=lanczos"

# MP4 H.264
ffmpeg -y -i $IN -an -vf "$VFM" -c:v libx264 -preset slow -b:v 850k -maxrate 1300k -bufsize 1700k -pass 1 -profile:v high -pix_fmt yuv420p $COL -f mp4 NUL
ffmpeg -y -i $IN -an -vf "$VFM" -c:v libx264 -preset slow -b:v 850k -maxrate 1300k -bufsize 1700k -pass 2 -profile:v high -pix_fmt yuv420p $COL -movflags +faststart public/videos/hero-movil.mp4

# WebM VP9
ffmpeg -y -i $IN -an -vf "$VFM" -c:v libvpx-vp9 -b:v 700k -maxrate 1100k -row-mt 1 -deadline good -cpu-used 2 -pass 1 $COL -f webm NUL
ffmpeg -y -i $IN -an -vf "$VFM" -c:v libvpx-vp9 -b:v 700k -maxrate 1100k -row-mt 1 -deadline good -cpu-used 1 -pass 2 $COL public/videos/hero-movil.webm
```

En Linux o macOS, cambiar `NUL` por `/dev/null`.
