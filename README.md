# ThumbnailPreview Component

A React component that displays a thumbnail preview when hovering over the progress bar of a video. This component uses a sprite sheet to show different thumbnails at different times in the video.

## Features

- Shows thumbnail previews when hovering over the video progress bar.
- Automatically aligns thumbnails based on hover position.
- Ensures efficient loading and display of thumbnails using a sprite sheet.

## Other Libraries
- Used FFmpeg to extract thumbnails at regular intervals.
-  ```ffmpeg -i Video.mp4 -vf "fps=1/10" thumbnail-%03d.png```
- After extracting thumbnails, create a sprite sheet using ImageMagick
-  ```montage thumbnail-*.png -tile x1 -geometry +0+0 sprite.png```

-  
![Screenshot from 2024-07-20 11-37-16](https://github.com/user-attachments/assets/34e8f1a9-830c-4614-92b8-9d3f3119be6b)




