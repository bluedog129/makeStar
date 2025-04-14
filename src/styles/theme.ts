export const theme = {
  colors: {
    background: '#E5E5E5',
    white: '#ffffff',
    text: '#333333',
    primary: '#000000',
    albumManage: {
      background: '#F6F6F6',
      border: '#EBEBEB',
    }
  },
  layout: {
    maxWidth: '390px',
    mobilePadding: '20px',
  },
  mediaQueries: {
    mobile: '(max-width: 390px)',
    tablet: '(min-width: 391px) and (max-width: 768px)',
    desktop: '(min-width: 769px)',
  },
} as const; 