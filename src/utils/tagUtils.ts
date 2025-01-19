// タグの型定義
type ProgrammingTags = "typescript" | "javascript" | "react" | "nextjs" | "rust" | "async" | "docker" | "infrastructure";
type TradingTags = "trading" | "technical-analysis" | "risk-management" | "psychology" | "market-analysis";
type BlockchainTags = "crypto" | "defi" | "blockchain" | "investment";
type Tag = ProgrammingTags | TradingTags | BlockchainTags | string;

interface TagCategory {
    category: string;
    tags: Tag[];
}
  
interface TagCounts {
    [key: string]: number;
}

export const tagCategories = {
    "Programming": ["typescript", "javascript", "react", "nextjs", "rust", "async", "docker", "infrastructure"],
    "Trading": ["trading", "technical-analysis", "risk-management", "psychology", "market-analysis"],
    "Blockchain": ["crypto", "defi", "blockchain", "investment"]
} as const;

type TagCategoryKey = keyof typeof tagCategories;
type CategoryTags = typeof tagCategories[TagCategoryKey][number];

export function getTagCounts(posts: any[]): TagCounts {
    if (!Array.isArray(posts)) return {};
    
    return posts.reduce((acc, post) => {
        if (post?.data?.tags && Array.isArray(post.data.tags)) {
            post.data.tags.forEach((tag: Tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
            });
        }
        return acc;
    }, {} as TagCounts);
}

export function categorizeTags(allTags: Tag[], tagCounts?: TagCounts) {
    if (!Array.isArray(allTags)) {
        allTags = [];
    }

    const categorizedTags = Object.entries(tagCategories).map(([category, categoryTags]) => ({
        category,
        tags: allTags
            .filter(tag => (categoryTags as readonly string[]).includes(tag))
            .sort((a, b) => {
                if (!tagCounts) return 0;
                return (tagCounts[b] || 0) - (tagCounts[a] || 0);
            })
    }));

    const definedTags = (Object.values(tagCategories).flat() as readonly string[]);
    const uncategorizedTags = allTags.filter(tag => !definedTags.includes(tag));

    if (uncategorizedTags.length > 0) {
        categorizedTags.push({
            category: "Uncategorized",
            tags: uncategorizedTags.sort((a, b) => {
                if (!tagCounts) return 0;
                return (tagCounts[b] || 0) - (tagCounts[a] || 0);
            })
        });
    }

    return categorizedTags.filter(category => category.tags && category.tags.length > 0);
}