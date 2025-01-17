import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const formattedPosts = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    url: `/blog/${post.slug}`,
  }));

  return new Response(JSON.stringify(formattedPosts), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}