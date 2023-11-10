import ThreeProductList from "../components/ThreeProductList";
import { useSelector } from "react-redux";
function Home() {
  const data = useSelector((state) => state.globalState);
  console.log(data);
  return (
    <>
      <ThreeProductList />
    </>
  );
}

export default Home;
