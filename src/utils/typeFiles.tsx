export type fileType = 'pdf' | 'txt';

const API_FATICON = '509654a93e5927ddfa16767cf1bd638ad7fe857a';

export const typeFile = (type: fileType): string => {
  if (type === 'pdf') {
    return '../assets/images/pdf.png';
  }
  return '';
};
