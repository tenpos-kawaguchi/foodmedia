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
  public async getMenuCategories(): Promise<MenuItemType[]> {
    try {
      const res = await RepositoryFactory.menu.getCategoriesForMenu();
      const categories = res.data.data.categories.edges;

      return categories.map((data: { node: CategoryNode }) => {
        const node = data.node;
        return {
          id: node.id,
          name: node.name,
          slug: node.slug,
          uri: node.uri,
          count: node.count,
          children:
            node.children?.edges?.map(
              (child: { node: CategoryNode }) => child.node
            ) || [],
        };
      });
    } catch (error) {
      console.error("メニューカテゴリの取得に失敗しました:", error);
      return [];
    }
  }
}

export default MenuService;
