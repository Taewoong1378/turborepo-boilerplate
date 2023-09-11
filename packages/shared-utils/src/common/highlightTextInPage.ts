export const highlightTextInPage = ({
  html,
  pageNumber,
  searchText,
}: {
  html: string;
  pageNumber: number;
  searchText: string;
}) => {
  // 특정 페이지 ID 및 그 페이지 내에서 교체하려는 텍스트 지정
  const pageId = `pf${pageNumber}`; // 예시로 'pf2' 페이지에서만 텍스트를 바꿈

  // 페이지를 DOMParser를 사용하여 분석
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const specificPage = doc.getElementById(pageId);

  // 페이지가 존재하고, 해당 페이지에 교체하려는 텍스트가 있다면 교체
  if (specificPage) {
    const regex = new RegExp(searchText, 'g');
    specificPage.innerHTML = specificPage.innerHTML.replace(
      regex,
      `<span style="color: red; text-decoration: underline;">${searchText}</span>`,
    );
  }

  // 변경된 내용을 다시 문자열로 변환
  const serializedDoc = new XMLSerializer().serializeToString(doc);
  return serializedDoc;
};
