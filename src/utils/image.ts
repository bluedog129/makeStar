export const getImageSource = (image: string | { default: string } | undefined): string => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return image.default;
}; 