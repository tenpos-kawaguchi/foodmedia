import RepositoryFactory from "../repositories/RepositoryFactory";
import type { PostType } from "@/types/PostType";

class PostService {
  public async getList(): Promise<PostType[]> {
    try {
      const res = await RepositoryFactory.post.getList();
      return res.data.data.posts.edges.map((data: { node: PostType }) => {
        return data.node;
      }); // 扱いやすいようにデータを加工する
    } catch {
      return []; // エラーだった場合は空のpostListにする
    }
  }

  public async getBySlug(slug: string): Promise<PostType | null> {
    try {
      const res = await RepositoryFactory.post.getBySlug(slug);
      return res.data.data.post;
    } catch {
      return null; // エラーだった場合はnullを返す
    }
  }
}

export default PostService;
