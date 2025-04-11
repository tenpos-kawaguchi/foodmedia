import Repository from "./Repository";

class PostRepository {
  public getList() {
    return Repository(`query testQuery {
  posts {
    edges {
      node {
        slug
        title
        postId
        uri
        featuredImage {
          node {
            sourceUrl(size: MEDIUM)
          }
        }
      }
    }
  }
}`).getWp(); // graphQLのIDEのをコピペ
  }
}

export default PostRepository;
