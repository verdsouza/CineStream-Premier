import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (!src) {
        setImgSrc('');
        return;
    }
    
    // Logic to determine if it's a remote URL or local public file
    if (src.startsWith('http') || src.startsWith('https') || src.startsWith('data:')) {
        setImgSrc(src);
    } else {
        // Assume it's a local file in the public folder
        // Ensure it starts with a slash
        const formatted = src.startsWith('/') ? src : `/${src}`;
        setImgSrc(formatted);
    }
    setError(false);
  }, [src]);

  if (error || !imgSrc) {
    return (
      <div className={`bg-dark-800 flex flex-col items-center justify-center border border-dark-700 ${className}`} role="img" aria-label={alt}>
        <ImageOff className="text-gray-600 h-8 w-8 mb-2" />
        <span className="text-[10px] text-gray-500 font-mono text-center px-2 truncate w-full">
            {imgSrc || 'No Image'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default SmartImage;