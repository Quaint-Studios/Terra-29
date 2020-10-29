import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

const contentsDirectory = join(process.cwd(), '_contents');

export function getContentDirectories() {
  return fs.readdirSync(contentsDirectory);
}

export function getContentFiles(initialPaths: string[], fields: string[] = []) {
  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  type PageContent = {
    name: string;
    data: any;
    content: string;
  };

  type Directory = {
    name: string;
    children: (Directory | PageContent)[];
  };

  function getStructure(paths: string[], lastPath: string = '') {
    const structure: (Directory | PageContent)[] = [];

    paths.forEach((rawPath) => {
      const path = join(lastPath || contentsDirectory, rawPath);

      if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
        const newDirectories = fs.readdirSync(path);
        const newContents = getStructure(newDirectories, path);

        structure.push({
          name: rawPath.replace('_', ' '),
          children: newContents
        });
      } else if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
        if (path.endsWith('.md')) {
          const fileContents = fs.readFileSync(path, 'utf8');
          const { data, content } = matter(fileContents);

          // TODO (Kris): Remove after testing these two lines in a final iteration..
          // console.log('data!:', data);
          // console.log('content!: ', content);

          // Ensure only the minimal needed data is exposed
          fields.forEach((field) => {
            if (field === 'slug') {
              items[field] = rawPath;
            }
            if (field === 'content') {
              items[field] = content;
            }

            if (data[field]) {
              items[field] = data[field];
            }

            /* if index == true then push pageContent. */
          });

          const pageContent: PageContent = {
            name: rawPath.replace('_', ' ').replace(/\.md$/, ''),
            data,
            content
          };
          structure.push(pageContent);
        }
      }
    });

    return structure;
  }

  return getStructure(initialPaths);

  /*

   */
}

export function getAllContent(fields: string[] = []) {
  const contentFiles = getContentDirectories();

  return getContentFiles(contentFiles, fields);
}
