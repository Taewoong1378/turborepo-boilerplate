export const cleanUpHtml = (htmlString: string) => {
  // 불필요한 <span> 태그와 그 내용 제거
  const cleaned = htmlString.replace(/<span[^>]*>.*?<\/span>/g, '');

  // 연속된 공백을 하나의 공백으로 대체
  return cleaned.replace(/\s+/g, ' ');
};
