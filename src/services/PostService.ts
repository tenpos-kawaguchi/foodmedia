import RepositoryFactory from '../repositories/RepositoryFactory';
import type { PostType } from '@/types/PostType';

class PostService {
  public async getList(): Promise<PostType[]> {
    try {
      const res = await RepositoryFactory.post.getList();
      return res.data.data.openmaps.edges.map((data: { node: PostType }) => {
        return data.node;
      }); // 扱いやすいようにデータを加工する
    } catch {
      return []; // エラーだった場合は空のpostListにする
    }
  }

  public async getPopularPosts(limit: number = 10): Promise<PostType[]> {
    try {
      const res = await RepositoryFactory.post.getPopularPosts(limit);

      // popularPostsクエリのレスポンス形式に対応
      const popularPosts = res.data.data.popularPosts || [];
      return popularPosts;
    } catch (error) {
      console.error('❌ Error in getPopularPosts:', error);
      return []; // エラーだった場合は空の配列を返す
    }
  }

  public async getBySlug(slug: string): Promise<PostType | null> {
    try {
      // まずスラッグで試行
      const res = await RepositoryFactory.post.getBySlug(slug);
      // console.log('🎯 getBySlug:', res);
      if (res.data.data.post) {
        return res.data.data.post;
      }

      // スラッグで見つからない場合は記事IDとして試行
      const resById = await RepositoryFactory.post.getById(slug);
      return resById.data.data.post;
    } catch {
      return null; // エラーだった場合はnullを返す
    }
  }

  public async getById(id: string): Promise<PostType | null> {
    try {
      const res = await RepositoryFactory.post.getById(id);
      return res.data.data.post;
    } catch {
      return null; // エラーだった場合はnullを返す
    }
  }

  // サブカテゴリとスラッグから記事を取得
  public async getBySubCategoryAndSlug(
    subCategory: string,
    slug: string
  ): Promise<PostType | null> {
    try {
      // まずスラッグで試行
      const res = await RepositoryFactory.post.getBySlug(slug);
      if (res.data.data.post) {
        return res.data.data.post;
      }

      // スラッグで見つからない場合は記事IDとして試行
      const resById = await RepositoryFactory.post.getById(slug);
      return resById.data.data.post;
    } catch {
      return null; // エラーだった場合はnullを返す
    }
  }
}

export default PostService;
