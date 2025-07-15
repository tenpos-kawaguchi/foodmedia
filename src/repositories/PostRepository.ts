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

  public getBySlug(slug: string) {
    return Repository(
      `query getPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    slug
    title
    postId
    uri
    date
    modified
    excerpt
    content
    featuredImage {
      node {
        sourceUrl(size: LARGE)
      }
    }
    author {
      node {
        name
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
  }
}`,
      { slug }
    ).getWp();
  }
}

export default PostRepository;
