import Repository from './Repository';

class MenuRepository {
  public getMainMenu() {
    return Repository(`query GetGlobalMenu {
      menuItems(where: {location: GLOBAL_MENU, parentDatabaseId: 0}, first: 100) {
        nodes {
          id
          uri
          label
          childItems {
            nodes {
              id
              label
              uri
              parentDatabaseId
              parentId
            }
          }
          parentId
          parentDatabaseId
        }
      }
    }`).getWp();
  }

  public getCategoriesForMenu() {
    return Repository(`query GetCategoriesForMenu {
      categories(where: {parent: 0}, first: 100) {
        edges {
          node {
            id
            name
            slug
            uri
            count
            children {
              edges {
                node {
                  id
                  name
                  slug
                  uri
                  count
                }
              }
            }
          }
        }
      }
    }`).getWp();
  }
}

export default MenuRepository;
