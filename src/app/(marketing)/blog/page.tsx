import { Metadata } from 'next';
import { BlogContent } from './blog-content';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Mortgage Blog Houston | Home Buying Tips & Guides | Lending & Living',
  description: 'Expert mortgage advice, home buying tips, and guides for Houston homebuyers. ITIN loans, DPA programs, first-time buyer resources in English and Spanish.',
  keywords: [
    'Houston mortgage blog',
    'home buying tips Houston',
    'ITIN loan guide',
    'down payment assistance guide',
    'first-time buyer Houston',
    'mortgage advice Houston',
  ],
  openGraph: {
    title: 'Mortgage Blog Houston | Home Buying Tips & Guides',
    description: 'Expert mortgage advice and guides for Houston homebuyers.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogContent initialPosts={posts} />;
}
