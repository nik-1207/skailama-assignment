import { CirclePlus } from "lucide-react";
import { useShopStore } from "../../stores/shop.store";
import "./header.module.scss";

export const Header = () => {
  const activeShop = useShopStore((state) => state.activeShop);

  return (
    <header>
      <div>
        <h1>{activeShop ?? "No Active Shop"}</h1>
        <button>
          <CirclePlus size={20} />
          Select Shop
        </button>
      </div>
    </header>
  );
};
