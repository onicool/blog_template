import { getCollection } from 'astro:content';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function GET({ site }) {
  const posts = await getCollection('blog');
  const pages = ['', 'about', 'blog'];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${new URL(page, site).href}</loc>
          <lastmod>${formatDate(new Date())}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `
        )
        .join('')}
      ${posts
        .map(
          (post) => `
        <url>
          <loc>${new URL(`blog/${post.slug}`, site).href}</loc>
          <lastmod>${formatDate(post.data.pubDate)}</lastmod>
          <changefreq>yearly</changefreq>
          <priority>0.6</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`.trim()
  );
}