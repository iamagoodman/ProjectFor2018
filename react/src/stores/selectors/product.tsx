import { createSelector } from 'reselect';

const content = (con?: string) => con;

export const getProductPreviewContent = createSelector(content, (con: string) => {
  let newContent = '';
  if (con) {
    const matchArr = con.match(/<body class="body-wrapper">([\s\S]*)<\/body>/);
    if (matchArr) {
      newContent = matchArr[1].replace(/<script [^>]*><\/script>/, '');
    }
  }
  return newContent;
});
