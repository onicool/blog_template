// lib/utils/search.ts
import type { CollectionEntry } from 'astro:content';

export function searchPosts(posts: CollectionEntry<'blog'>[], query: string): CollectionEntry<'blog'>[] {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return posts.filter(post => {
    const searchableContent = [
      post.data.title,
      post.data.description,
      ...post.data.tags,
    ].map(content => (content || '').toLowerCase());

    return searchTerms.every(term =>
      searchableContent.some(content => content.includes(term))
    );
  }).sort((a, b) => {
    // 最新の投稿を優先
    return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
  });
}