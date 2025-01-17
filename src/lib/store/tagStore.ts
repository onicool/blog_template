// タグの状態管理
export type TagState = {
  selectedTag: string | null;
  previousTag: string | null;
};

class TagStore {
  private static instance: TagStore;
  private state: TagState = {
    selectedTag: null,
    previousTag: null
  };

  private constructor() {
    this.initializeFromHash();
  }

  static getInstance(): TagStore {
    if (!TagStore.instance) {
      TagStore.instance = new TagStore();
    }
    return TagStore.instance;
  }

  private initializeFromHash() {
    const hashTag = window.location.hash.slice(1);
    const storedTag = sessionStorage.getItem('selectedTag');
    this.state.selectedTag = hashTag || storedTag || null;
  }

  getSelectedTag(): string | null {
    return this.state.selectedTag;
  }

  setTag(tag: string | null) {
    // 同じタグが選択された場合は何もしない
    if (this.state.selectedTag === tag) {
      return;
    }

    this.state.previousTag = this.state.selectedTag;
    this.state.selectedTag = tag;
    
    if (tag) {
      sessionStorage.setItem('selectedTag', tag);
      // URLハッシュの更新をhistory.pushStateに変更
      history.pushState(null, '', `#${tag}`);
    } else {
      sessionStorage.removeItem('selectedTag');
      history.pushState(null, '', window.location.pathname);
    }
  }

  clearTag() {
    if (!this.state.selectedTag) {
      return;
    }
    this.setTag(null);
  }
}

export const tagStore = TagStore.getInstance();