"use client";

import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

interface MediaCenterGalleryItem {
  id: number;
  media_center_id: number;
  image: string;
  caption?: string | null;
  image_thumb?: string | null;
}

interface MediaGalleryProps {
  galleries: MediaCenterGalleryItem[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ galleries = [] }) => {
  if (!galleries || galleries.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 text-sm">No images in this gallery.</p>
      </div>
    );
  }

  // Format images for react-image-gallery
  const formattedImages = galleries.map((item) => {
    // If the caption is just an automatically generated image name (e.g. imgi_4_17471375051),
    // we don't display it to the user.
    const hasCleanCaption = item.caption && !item.caption.toLowerCase().startsWith("imgi_");
    return {
      original: item.image,
      thumbnail: item.image_thumb || item.image,
      originalAlt: item.caption || "Gallery image",
      thumbnailAlt: item.caption || "Thumbnail image",
      description: hasCleanCaption ? (item.caption ?? "") : "",
    };
  });

  return (
    <div className="w-full mb-10 overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-xl p-2 sm:p-4 md:p-6 select-none relative group/gallery">
      <div className="custom-gallery-wrapper">
        <ImageGallery
          items={formattedImages}
          showPlayButton={true}
          showFullscreenButton={true}
          showNav={true}
          showThumbnails={true}
          thumbnailPosition="bottom"
          lazyLoad={true}
          slideDuration={450}
          additionalClass="premium-image-gallery"
        />
      </div>

      <style jsx global>{`
        /* Polish react-image-gallery styling for a premium UI */
        .premium-image-gallery .image-gallery-slide-wrapper {
          border-radius: 12px;
          overflow: hidden;
          background-color: #0b0f19;
        }

        .premium-image-gallery .image-gallery-slide img {
          max-height: 600px;
          object-fit: contain;
          border-radius: 12px;
        }

        .premium-image-gallery .image-gallery-thumbnails-wrapper {
          margin-top: 16px;
        }

        .premium-image-gallery .image-gallery-thumbnail {
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          transition: all 0.2s ease-in-out;
          background: #0f172a;
          width: 90px;
          height: 60px;
        }

        .premium-image-gallery .image-gallery-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .premium-image-gallery .image-gallery-thumbnail.active,
        .premium-image-gallery .image-gallery-thumbnail:hover,
        .premium-image-gallery .image-gallery-thumbnail:focus {
          border-color: #3b82f6;
          transform: scale(1.05);
        }

        .premium-image-gallery .image-gallery-description {
          bottom: 20px;
          left: 20px;
          right: 20px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f8fafc;
          border-radius: 8px;
          padding: 12px 16px;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
          text-align: center;
          font-weight: 500;
        }

        .premium-image-gallery .image-gallery-icon {
          color: #f8fafc;
          transition: all 0.2s ease;
        }

        .premium-image-gallery .image-gallery-icon:hover {
          color: #3b82f6;
        }

        @media (max-width: 640px) {
          .premium-image-gallery .image-gallery-slide img {
            max-height: 350px;
          }
          .premium-image-gallery .image-gallery-thumbnail {
            width: 60px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default MediaGallery;
