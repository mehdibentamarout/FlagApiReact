import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Countries from "../components/Countries";
const Home = () => {
  return (
    <div className="home">
      <Navigation />
      <Logo />
      <Countries />
    </div>
  );
};

export default Home;
