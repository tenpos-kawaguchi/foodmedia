import RepositoryFactory from "../repositories/RepositoryFactory";
import type { CategoryType } from "@/types/CategoryType";
import type { PostType } from "@/types/PostType";

export interface CategoryWithPostsType extends CategoryType {
  posts: PostType[];
}

class CategoryService {
  public async getList(): Promise<CategoryType[]> {
    try {
      const res = await RepositoryFactory.category.getList();
      return res.data.data.categories.edges.map(
        (data: { node: CategoryType }) => {
          return data.node;
        }
      );
    } catch {
      return [];
    }
  }

  public async getBySlug(slug: string): Promise<CategoryWithPostsType | null> {
    try {
      const res = await RepositoryFactory.category.getBySlug(slug);
      const category = res.data.data.category;

      if (!category) {
        return null;
      }

      return {
        ...category,
        posts: category.posts.edges.map((data: { node: PostType }) => {
          return data.node;
        }),
      };
    } catch {
      return null;
    }
  }
}

export default CategoryService;
