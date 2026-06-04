export function getOptimizedUrl(url: string | null | undefined, width?: number): string {
  if (!url) return '';
  // Check if it's a cloudinary URL
  if (url.includes('res.cloudinary.com')) {
    // If it already has f_auto, return
    if (url.includes('f_auto') || url.includes('q_auto')) return url;
    
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      const transform = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
      return `${parts[0]}/upload/${transform}/${parts[1]}`;
    }
  }
  return url;
}
