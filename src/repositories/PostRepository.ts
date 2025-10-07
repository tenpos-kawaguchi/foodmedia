import Repository from './Repository';

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

  public getPopularPosts(limit: number = 10) {
    console.log('🚀 PostRepository.getPopularPosts called with limit:', limit);
    console.log('📝 Using popularPosts query for ranking');
    console.log('📋 Variables:', { limit });

    return Repository(
      `query getRanking($limit: Int!) {
        popularPosts(limit: $limit) {
          views
          title
          permalink
          id
        }
      }`,
      { limit }
    ).getWp();
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

  public getById(id: string) {
    return Repository(
      `query getPostById($id: ID!) {
  post(id: $id, idType: DATABASE_ID) {
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
      { id }
    ).getWp();
  }
}

export default PostRepository;
