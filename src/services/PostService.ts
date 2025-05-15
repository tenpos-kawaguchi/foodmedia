import RepositoryFactory from "../repositories/RepositoryFactory";
import type { PostType } from "@/types/PostType";

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

  // 新しいクエリに対応するサービスメソッド
  public async getNewQuery(): Promise<PostType[]> {
    try {
      const res = await RepositoryFactory.post.getNewQuery();
      // レスポンスの構造に応じて適切なデータ加工を行う
      return res.data.data.newQuery.edges.map((data: { node: PostType }) => {
        return data.node;
      });
    } catch {
      return [];
    }
  }
}

export default PostService;
