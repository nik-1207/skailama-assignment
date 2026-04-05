import { Breadcrumbs } from "./components/Breadcrumbs";
import { Campaigns } from "./components/Campaigns";
import { CreateCampaign } from "./components/CreateCampaign";
import { CreateOrder } from "./components/CreateOrder";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import {
  ROUTE_CAMPAIGNS,
  ROUTE_CREATE_CAMPAIGN,
  ROUTE_CUSTOMERS,
  ROUTE_HOME,
  ROUTE_ORDERS,
  useRouteStore,
} from "./stores/route.store";
import "./app.scss";

function App() {
  const route = useRouteStore((state) => state.route);

  return (
    <>
      <Header />
      <main>
        {route === ROUTE_HOME ? <Home /> : null}
        <div className="content">
          {route !== ROUTE_HOME ? <Breadcrumbs /> : null}
          {route === ROUTE_ORDERS ? <CreateOrder /> : null}
          {route === ROUTE_CAMPAIGNS ? <Campaigns /> : null}
          {route === ROUTE_CREATE_CAMPAIGN ? <CreateCampaign /> : null}
          {route === ROUTE_CUSTOMERS ? <>customers</> : null}
        </div>
      </main>
      <div id="modal-root" />
    </>
  );
}

export default App;
