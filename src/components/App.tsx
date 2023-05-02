import Footer from "./Footer.js";
import Header from "./Header.js";
import PortraitGame from "./PortraitGame.js";

const App = () => {
  const favoriteColorExample = "purple";

  return (
    <>
      <Header />
      <main>
        <PortraitGame />
        <input type="text" placeholder={ // this is JSX
          `your favourite color (for example, "${favoriteColorExample}")` // this is javascript
          } /> { /*This is JSX too*/ }
      </main>
      <Footer />
    </>
  );
};

export default App;
