import PostRepository from "./PostRepository";
import CategoryRepository from "./CategoryRepository";
import MenuRepository from "./MenuRepository";

const RepositoryFactory = {
  post: new PostRepository(),
  category: new CategoryRepository(),
  menu: new MenuRepository(),
  //  news: NewsRepository ←　今後こんな感じで増えていく
};

export default RepositoryFactory;
