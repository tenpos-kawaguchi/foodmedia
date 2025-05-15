import { TopMv, TopFlow, TopIndustry, TopContact } from "./components/top";
const Home = () => {
  return (
    <main className="relative z-1">
      <TopMv />
      <TopFlow />
      <TopIndustry />
      <TopContact />
    </main>
  );
};

export default Home;
