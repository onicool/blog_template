// src/utils/tagUtils.ts
interface TagCategory {
    category: string;
    tags: string[];
  }
  
  interface TagCounts {
    [key: string]: number;
  }
  
  export const tagCategories = {
    "Programming": ["typescript", "javascript", "react", "nextjs", "rust", "async", "docker", "infrastructure"],
    "Trading": ["trading", "technical-analysis", "risk-management", "psychology", "market-analysis"],
    "Blockchain": ["crypto", "defi", "blockchain", "investment"]
  } as const;
  
  export function getTagCounts(posts: any[]): TagCounts {
    if (!Array.isArray(posts)) return {};
    
    return posts.reduce((acc, post) => {
      if (post?.data?.tags && Array.isArray(post.data.tags)) {
        post.data.tags.forEach((tag: string) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {} as TagCounts);
  }
  
  export function categorizeTags(allTags: string[], tagCounts?: TagCounts) {
    if (!Array.isArray(allTags)) {
      allTags = [];
    }
  
    // カテゴリー別にタグを分類
    const categorizedTags = Object.entries(tagCategories).map(([category, categoryTags]) => {
      if (!Array.isArray(categoryTags)) {
        categoryTags = [];
      }
      
      return {
        category,
        tags: allTags
          .filter(tag => categoryTags.includes(tag))
          .sort((a, b) => {
            if (!tagCounts) return 0;
            return (tagCounts[b] || 0) - (tagCounts[a] || 0);
          })
      };
    });
  
    // 定義済みのタグを全て集める
    const definedTags = Object.values(tagCategories).flat();
    
    // 未分類のタグを見つける
    const uncategorizedTags = allTags.filter(tag => !definedTags.includes(tag));
  
    // 未分類タグがある場合のみ、Uncategorizedカテゴリーを追加
    if (uncategorizedTags.length > 0) {
      categorizedTags.push({
        category: "Uncategorized",
        tags: uncategorizedTags.sort((a, b) => {
          if (!tagCounts) return 0;
          return (tagCounts[b] || 0) - (tagCounts[a] || 0);
        })
      });
    }
  
    // タグが存在するカテゴリーのみを返す
    return categorizedTags.filter(category => category.tags && category.tags.length > 0);
  }