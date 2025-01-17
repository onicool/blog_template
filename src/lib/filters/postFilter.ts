import type { CollectionEntry } from 'astro:content';
import Fuse from 'fuse.js';

export class PostFilter {
  private posts: CollectionEntry<'blog'>[];
  private fuse: Fuse<CollectionEntry<'blog'>>;

  constructor(posts: CollectionEntry<'blog'>[]) {
    this.posts = posts;
    this.fuse = new Fuse(posts, {
      keys: ['data.title', 'data.description', 'data.tags'],
      threshold: 0.3
    });
  }

  filterByTag(tag: string | null): CollectionEntry<'blog'>[] {
    if (!tag) return this.posts;
    return this.posts.filter(post => post.data.tags.includes(tag));
  }

  search(query: string | null): CollectionEntry<'blog'>[] {
    if (!query) return this.posts;
    return this.fuse.search(query).map(result => result.item);
  }

  applyFilters(tag: string | null, query: string | null): CollectionEntry<'blog'>[] {
    let filtered = this.posts;
    
    if (tag) {
      filtered = this.filterByTag(tag);
    }
    
    if (query) {
      const searchResults = this.search(query);
      filtered = filtered.filter(post => 
        searchResults.some(result => result.id === post.id)
      );
    }
    
    return filtered;
  }
}