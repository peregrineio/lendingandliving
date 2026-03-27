import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogPostMeta } from './blog-types';

// Re-export types and categories for convenience
export type { BlogPost, BlogPostMeta } from './blog-types';
export { categories } from './blog-types';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug: data.slug || filename.replace('.mdx', ''),
      title: data.title || '',
      titleEs: data.titleEs || data.title || '',
      description: data.description || '',
      descriptionEs: data.descriptionEs || data.description || '',
      date: data.date || new Date().toISOString(),
      category: data.category || 'general',
      tags: data.tags || [],
      author: data.author || 'Daisy Castro-Shahin',
      readTime: data.readTime || `${Math.ceil(stats.minutes)} min`,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const postSlug = data.slug || filename.replace('.mdx', '');

    if (postSlug === slug) {
      const stats = readingTime(content);
      return {
        slug: postSlug,
        title: data.title || '',
        titleEs: data.titleEs || data.title || '',
        description: data.description || '',
        descriptionEs: data.descriptionEs || data.description || '',
        date: data.date || new Date().toISOString(),
        category: data.category || 'general',
        tags: data.tags || [],
        author: data.author || 'Daisy Castro-Shahin',
        readTime: data.readTime || `${Math.ceil(stats.minutes)} min`,
        content,
      };
    }
  }

  return null;
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  const posts = getAllPosts();
  if (category === 'all') return posts;
  return posts.filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === category)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data.slug || filename.replace('.mdx', '');
  });
}
