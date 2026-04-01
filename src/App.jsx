import { useState } from "react";
import { Header } from "./components/Header";
import "./app.module.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>Body</main>
    </>
  );
}

export default App;
