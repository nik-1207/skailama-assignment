import { useShopStore } from "../../stores/shop.store";
import { Card } from "../Card";
import { Cards } from "./utils";

export const Home = () => {
  const activeStore = useShopStore((state) => state.activeShop);
  return (
    <div>
      <h1>Cashback System Dashboard</h1>
      <p>{!activeStore ? "Please select a store to begin." : `Managing store: ${activeStore}`}</p>
      <div>
        {Cards.map((ele) => {
          const Icon = ele.icon;
          return (
            <Card key={ele.title}>
              <div>
                <div>
                  <Icon /> <span>{ele.title}</span>
                </div>
                <p>{ele.description}</p>
                <button>{ele.action}</button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
