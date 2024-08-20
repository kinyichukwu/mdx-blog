// search mdx files
import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';

export const searchMdxFiles = (searchQuery: string) => {
  const pattern = path.join('app', '**', '*.mdx');
  const files = glob.sync(pattern, { cwd: process.cwd() });

  const results = files.map((filePath) => {
    const fullPath = path.join(process.cwd(), filePath);

    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const contentArray = fileContents.split(
      'export default ({ children }) => <div className="prose dark">{children}</div>;\n'
    );

    let parsedContent = contentArray.map((content) => {
      const relativePath = path.relative('app', filePath);
      const sanitizedPath = relativePath.replace(path.sep, '/').replace('page.mdx', '');

      return searchQueryInContent(content, sanitizedPath);
    });

    return parsedContent;
  });

  return results;
};

const searchQueryInContent = (c: string, path: string) => {
  c = c.replace(/\n/g, '***');

  let cleanedContent = c
    .split('******')
    .filter((line) => line !== '---' && !(line.startsWith('#') && line.trim() === '#') && line !== '');

  function parseContent(contentArray: string[], path: string) {
    let parsedArray: {
      title: string;
      description: string;
      path: string;
    }[] = [];
    let currentObject: null | { title: string; description: string; path: string } = null;

    // console.log(path, 'pathid here');

    contentArray.forEach((line) => {
      if (line.startsWith('#') && line.length < 35) {
        // Start a new object
        currentObject = {
          title: line.trim(),
          description: '',
          path: path
        };
      } else if (line.length >= 35) {
        // If the line contains alphabets, consider it a description
        if (currentObject) {
          currentObject.description += (currentObject.description ? ' ' : '') + line.trim();
          currentObject.path = path;
        }
      }

      if (currentObject)
        currentObject.path =
          '/docs' +
          (currentObject.path ? '/' + currentObject.path : '') +
          '/#' +
          currentObject.title.replaceAll('#', '').substring(1).replaceAll(' ', '-');

      if (currentObject?.description && currentObject?.title && currentObject?.path) {
        currentObject.path = currentObject.path.replace('\\', '');
        parsedArray.push(currentObject);
      }
    });

    return parsedArray;
  }

  // res that should be sent to the frontend

  return parseContent(cleanedContent, path);
};

// this will be used to send all the mdx files to the client
// export const searchMdxFiles = (searchQuery: string) => {
//   const files = glob.sync('src/pages/docs/**/*.mdx', { cwd: process.cwd() });

//   const results = files.map((filePath) => {
//     const fullPath = path.join(process.cwd(), filePath);
//     const fileContents = fs.readFileSync(fullPath, 'utf-8');

//     // Use gray-matter to parse the front matter
//     const { data, content } = matter(fileContents);
//     console.log(content, 'files');

//     // Perform your search logic here (e.g., search in front matter, content, etc.)
//     // so in summary we need to find a way to seprate the search via
//     if (
//       content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       Object.values(data).some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
//     ) {
//       return {
//         filePath,
//         ...data,
//         content
//       };
//     }

//     return null;
//   });

//   return results.filter((result) => result !== null);
// };
