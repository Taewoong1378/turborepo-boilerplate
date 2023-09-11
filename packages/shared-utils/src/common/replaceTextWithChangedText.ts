const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

interface replaceTextWithChangedProps {
  html: string;
  searchText: string;
  changedText: string;
  pageNumber: number;
}

export const replaceTextWithChangedText = ({
  html,
  searchText,
  changedText,
  pageNumber,
}: replaceTextWithChangedProps) => {
  const pageId = `pf${pageNumber}`;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const specificPage = doc.getElementById(pageId);

  // 새로운 HTML 문서를 만들어서 해당 페이지를 복사합니다.
  const newDoc = parser.parseFromString(
    '<!DOCTYPE html><html><head></head><body></body></html>',
    'text/html',
  );

  if (specificPage) {
    const escapedSearchText = escapeRegExp(searchText);

    // 정규식에서 해당 div 안의 텍스트만 포함하도록 조정
    const regex = new RegExp(`(>)([^<]*${escapedSearchText}[^<]*)(<)`, 'g');

    specificPage.innerHTML = specificPage.innerHTML.replace(regex, (_, before, match, after) => {
      const replacedString = match.replace(new RegExp(escapedSearchText, 'g'), changedText);
      return `${before}<span class="replaced-text">${replacedString}</span>${after}`;
    });

    newDoc.body.appendChild(specificPage.cloneNode(true));
  }

  // 원본 문서의 스타일 태그들도 복사합니다.
  const styles = doc.querySelectorAll('style, link[rel="stylesheet"]');
  styles.forEach((style) => {
    newDoc.head.appendChild(style.cloneNode(true));
  });

  // 변경된 내용을 다시 문자열로 변환
  return new XMLSerializer().serializeToString(newDoc);
};
