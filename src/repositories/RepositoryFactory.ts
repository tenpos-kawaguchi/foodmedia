import PostRepository from "./PostRepository";

const RepositoryFactory = {
  post: new PostRepository(),
  //  news: NewsRepository ←　今後こんな感じで増えていく
};

export default RepositoryFactory;
