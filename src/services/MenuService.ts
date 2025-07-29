import RepositoryFactory from "../repositories/RepositoryFactory";

export interface MenuItemType {
  id: string;
  name: string;
  slug: string;
  uri: string;
  count: number;
  children?: MenuItemType[];
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
        return uri.replace(pattern, "/");
      }
    }

    return uri;
  }

  public async getMenuCategories(): Promise<MenuItemType[]> {
    try {
      const res = await RepositoryFactory.menu.getCategoriesForMenu();
      const categories = res.data.data.categories.edges;

      const mappedCategories = categories.map(
        (data: { node: CategoryNode }) => {
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
        }
      );

      // 未分類カテゴリを除外
      return mappedCategories.filter((category: MenuItemType) => {
        // 親カテゴリが未分類の場合は除外
        if (category.name === "未分類" || category.slug === "uncategorized") {
          return false;
        }

        // 子カテゴリから未分類を除外
        if (category.children) {
          category.children = category.children.filter(
            (child: MenuItemType) => {
              return child.name !== "未分類" && child.slug !== "uncategorized";
            }
          );
        }

        return true;
      });
    } catch (error) {
      console.error("メニューカテゴリの取得に失敗しました:", error);
      return [];
    }
  }
}

export default MenuService;
