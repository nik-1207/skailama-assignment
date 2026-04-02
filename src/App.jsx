import { Header } from "./components/Header";
import { Home } from "./components/Home";
import "./app.scss";

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <div id="modal-root" />
    </>
  );
}

export default App;
