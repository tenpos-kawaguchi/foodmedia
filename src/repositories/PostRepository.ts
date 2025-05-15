import Repository from "./Repository";

class PostRepository {
  public getList() {
    return Repository(
      `query OpenmapQuery {
        openmaps {
          edges {
            node {
              slug
              title
              uri
              id
              openmapId
            }
          }
        }
      }`
    ).getWp(); // graphQLのIDEのをコピペ
  }

  // 新しいクエリを追加する例
  public getNewQuery() {
    return Repository(
      `query NewQuery {
  // ここに新しいクエリを記述
}`
    ).getWp();
  }
}

export default PostRepository;
