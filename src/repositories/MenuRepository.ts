import Repository from "./Repository";

class MenuRepository {
  public getMainMenu() {
    return Repository(`query GetMainMenu {
      menus(where: {location: PRIMARY}) {
        nodes {
          id
          name
          menuItems {
            nodes {
              id
              label
              url
              parentId
            }
          }
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
