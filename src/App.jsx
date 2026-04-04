import { Breadcrumbs } from "./components/Breadcrumbs";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ROUTE_CAMPAIGNS, ROUTE_CUSTOMERS, ROUTE_HOME, ROUTE_ORDERS, useRouteStore } from "./stores/route.store";
import "./app.scss";

function App() {
  const route = useRouteStore((state) => state.route);

  return (
    <>
      <Header />
      <main>
        {route !== ROUTE_HOME ? <Breadcrumbs /> : null}
        
        {route === ROUTE_HOME ? <Home /> : null}
        {route === ROUTE_ORDERS ? <>create-order</> : null}
        {route === ROUTE_CAMPAIGNS ? <>create-campaigns</> : null}
        {route === ROUTE_CUSTOMERS ? <>customers</> : null}
      </main>
      <div id="modal-root" />
    </>
  );
}

export default App;
