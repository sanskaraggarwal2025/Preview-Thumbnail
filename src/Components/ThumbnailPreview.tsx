import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ThumbnailPreview.css';

interface ThumbnailPreviewProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    spriteSheet: string;
    spriteWidth: number;
    spriteHeight: number;
    thumbnailsCount: number;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
    videoRef,
    spriteSheet,
    spriteWidth,
    spriteHeight,
    thumbnailsCount,
}) => {
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const thumbnailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (videoRef.current) {
                setVideoDuration(videoRef.current.duration);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, [videoRef]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!progressBarRef.current || videoDuration === 0) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const hoverTime = (offsetX / rect.width) * videoDuration;
        if (!isNaN(hoverTime)) {
            setHoverTime(hoverTime);

            if (thumbnailRef.current) {
                const thumbnailRect = thumbnailRef.current.getBoundingClientRect();
                const thumbnailLeft = Math.min(
                    Math.max(0, offsetX - thumbnailRect.width / 2),
                    rect.width - thumbnailRect.width
                );
                thumbnailRef.current.style.left = `${thumbnailLeft}px`;
            }
        }
    }, [videoDuration]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (!progressBarRef.current || !videoRef.current || videoDuration === 0) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const clickTime = (offsetX / rect.width) * videoDuration;

        if (!isNaN(clickTime)) {
            videoRef.current.currentTime = clickTime;
        }
    }, [videoDuration, videoRef]);

    const getThumbnailPosition = useCallback(() => {
        if (hoverTime === null) return { backgroundPositionX: '0px', backgroundPositionY: '0px' };

        const index = Math.floor((hoverTime / videoDuration) * thumbnailsCount);
        const posX = -(index * spriteWidth);

        return { backgroundPositionX: `${posX}px`, backgroundPositionY: '0px' };
    }, [hoverTime, videoDuration, thumbnailsCount, spriteWidth]);

    return (
        <>
            <div
                className="progress-bar"
                ref={progressBarRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    setHoverTime(null);
                    if (thumbnailRef.current) {
                        thumbnailRef.current.style.display = 'none';
                    }
                }}
                onMouseEnter={() => {
                    if (thumbnailRef.current) {
                        thumbnailRef.current.style.display = 'block';
                    }
                }}
                onClick={handleClick}
            >
                <div
                    className="thumbnail-preview"
                    ref={thumbnailRef}
                    style={{
                        backgroundImage: `url(${spriteSheet})`,
                        backgroundSize: `${spriteWidth * thumbnailsCount}px ${spriteHeight}px`,
                        backgroundPositionX: getThumbnailPosition().backgroundPositionX,
                        backgroundPositionY: getThumbnailPosition().backgroundPositionY,
                        width: `${spriteWidth}px`,
                        height: `${spriteHeight}px`,
                    }}
                />
            </div>
        </>
    );
};

export default ThumbnailPreview;
