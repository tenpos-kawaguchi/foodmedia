import Repository from './Repository';

class CategoryRepository {
  public getList() {
    return Repository(`query GetCategories {
      categories {
        edges {
          node {
            id
            name
            slug
            uri
            count
            description
          }
        }
      }
    }`).getWp();
  }

  public getBySlug(slug: string) {
    return Repository(
      `query GetCategoryBySlug($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        id
        name
        slug
        uri
        count
        description
        posts {
          edges {
            node {
              id
              date
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
      }
    }`,
      { slug }
    ).getWp();
  }
}

export default CategoryRepository;
