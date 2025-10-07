import RepositoryFactory from '../repositories/RepositoryFactory';

export interface MenuItemType {
  id: string;
  name: string;
  slug: string;
  uri: string;
  count: number;
  children?: MenuItemType[];
}

// メニューアイテムの型定義を追加
export interface MenuItem {
  id: string;
  label: string;
  uri: string;
  parentId: string;
  parentDatabaseId: number;
  childItems?: {
    nodes: MenuItem[];
  };
}

// メニューの型定義を追加
export interface Menu {
  menuItems: {
    nodes: MenuItem[];
  };
}

interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  uri: string;
  count: number;
  children?: {
    edges: Array<{
      node: CategoryNode;
    }>;
  };
}

class MenuService {
  // WordPressのカテゴリURIを修正する関数
  private normalizeCategoryUri(uri: string): string {
    // 様々なWordPress設定に対応
    const patterns = [
      /^\/category\//, // /category/
      /^\/categories\//, // /categories/
      /^\/cat\//, // /cat/
      /^\/taxonomy\/category\//, // /taxonomy/category/
    ];

    for (const pattern of patterns) {
      if (pattern.test(uri)) {
        return uri.replace(pattern, '/');
      }
    }

    return uri;
  }

  // メインメニューを取得するメソッドを追加
  public async getMainMenu(): Promise<Menu | null> {
    try {
      const res = await RepositoryFactory.menu.getMainMenu();
      const menuItems = res.data.data.menuItems;

      if (menuItems && menuItems.nodes && menuItems.nodes.length > 0) {
        return {
          menuItems: {
            nodes: menuItems.nodes,
          },
        };
      }

      return null;
    } catch (error) {
      console.error('メインメニューの取得に失敗しました:', error);
      return null;
    }
  }

  public async getMenuCategories(): Promise<MenuItemType[]> {
    try {
      const res = await RepositoryFactory.menu.getCategoriesForMenu();
      const categories = res.data.data.categories.edges;

      const mappedCategories = categories.map((data: { node: CategoryNode }) => {
        const node = data.node;
        return {
          id: node.id,
          name: node.name,
          slug: node.slug,
          uri: this.normalizeCategoryUri(node.uri),
          count: node.count,
          children:
            node.children?.edges?.map((child: { node: CategoryNode }) => ({
              id: child.node.id,
              name: child.node.name,
              slug: child.node.slug,
              uri: this.normalizeCategoryUri(child.node.uri),
              count: child.node.count,
            })) || [],
        };
      });

      // 未分類カテゴリを除外
      return mappedCategories.filter((category: MenuItemType) => {
        // 親カテゴリが未分類の場合は除外
        if (category.name === '未分類' || category.slug === 'uncategorized') {
          return false;
        }

        // 子カテゴリから未分類を除外
        if (category.children) {
          category.children = category.children.filter((child: MenuItemType) => {
            return child.name !== '未分類' && child.slug !== 'uncategorized';
          });
        }

        return true;
      });
    } catch (error) {
      console.error('メニューカテゴリの取得に失敗しました:', error);
      return [];
    }
  }
}

export default MenuService;
