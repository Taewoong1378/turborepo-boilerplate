const option = {
  arrowParens: 'always', // 화살표 함수 괄호 사용 방식
  jsxSingleQuote: true, // JSX에 singe 쿼테이션 사용 여부
  bracketSameLine: true, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  singleQuote: true, // single 쿼테이션 사용 여부
  semi: true, // 세미콜론 사용 여부
  bracketSpacing: true, // 객체 리터럴에서 괄호에 공백 삽입 여부
  useTabs: false, // 탭 사용 여부
  tabWidth: 2, // 탭 너비
  trailingComma: 'all', // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  printWidth: 100, // 줄 바꿈 폭 길이
  endOfLine: 'auto', // EoF 방식, OS별로 처리 방식이 다름
  importOrder: [
    '^re(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@(?:components|containers|pages|containers)(.*)$',
    '^@(?:apis|interfaces|config)(.*)$',
    '^@(?:assets|constants|hooks|styles|utils|contexts)(.*)$',
    '^[./]',
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrderSortSpecifiers: true,
};

/** @type {import("prettier").Config} */
module.exports = {
  overrides: [
    {
      files: '*.{ts,tsx,js,jsx}',
      options: {
        ...option,
      },
    },
    {
      files: '*.d.ts',
      options: {
        ...option,
      },
    },
    {
      files: '*.{css,scss}',
      options: {
        singleQuote: false,
        semi: true,
        useTabs: true,
        tabWidth: 2,
      },
    },
  ],
};
