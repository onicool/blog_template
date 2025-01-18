// lib/utils/search.ts
import type { CollectionEntry } from 'astro:content';

export async function searchPosts(posts: CollectionEntry<'blog'>[], query: string): Promise<CollectionEntry<'blog'>[]> {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  const results = [];
  
  for (const post of posts) {
    try {
      // デバッグ出力を追加
      console.log('Searching post:', post.slug);
      console.log('Title:', post.data.title);
      console.log('Content:', post.body); // 実際の記事本文
      console.log('Search terms:', searchTerms);
      
      const searchableContent = [
        post.data.title.toLowerCase(),
        post.data.description?.toLowerCase() || '',
        ...post.data.tags.map(tag => tag.toLowerCase()),
        post.body.toLowerCase() // markdown形式の記事本文
      ];
      
      // 各検索語にマッチするかどうかも出力
      searchTerms.forEach(term => {
        console.log(`Checking term "${term}":`, 
          searchableContent.some(content => content.includes(term)));
      });

      const matches = searchTerms.every(term =>
        searchableContent.some(content => content.includes(term))
      );
      
      if (matches) {
        results.push(post);
      }
    } catch (e) {
      console.error(`Error searching post ${post.slug}:`, e);
    }
  }
  
  return results.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}