import { useState } from "react";
import { Header } from "./components/Header";
import "./app.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main>Body</main>
      <div id="modal-root" />
    </>
  );
}

export default App;
