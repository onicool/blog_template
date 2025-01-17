import { persistentAtom } from '@nanostores/persistent';

// フィルタリングの状態を管理するストア
export const selectedTagStore = persistentAtom<string | null>('selectedTag', null);
export const searchQueryStore = persistentAtom<string | null>('searchQuery', null);