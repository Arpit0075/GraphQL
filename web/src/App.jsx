import { useEffect } from "react";
import AddGame from "./components/AddGame";
import Game from "./components/Game";
import Ratings from "./components/Ratings";
import SpecificRating from "./components/SpecificRating";

function App() {
  const controller = new AbortController();
  const singnal = controller.signal;
  useEffect(() => {
    let url = "http://localhost:4000";
    const getData = async () => {
      let res = await fetch(url, { singnal });
      console.log(res);
      let response = await res.json();
      console.log(response);
    };

    getData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      {/* <Ratings />; */}
      {/* <SpecificRating /> */}
      <AddGame />
      <Game />
    </>
  );
}

export default App;
