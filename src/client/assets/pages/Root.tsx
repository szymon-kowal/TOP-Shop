import React, { useEffect, useState } from "react";
import useFetchCategories from "../hooks/useFetchCategories";
import useFetchData from "../hooks/useFetchData";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import type { Item } from "../components/interfaces";
import LoadingPage from "./LoadingPage";
import DisplayCart from "../components/displayCart";

interface ContextType {
  data: Item[];
  handleSetCartData: (newData: Item) => void;
}

// TODO - SetCartData needs to be displayed with amount;

export const Root: React.FC = () => {
  const { data: categories } = useFetchCategories(
    "https://fakestoreapi.com/products/categories"
  );

  const { data, pageState } = useFetchData("https://fakestoreapi.com/products");

  const isLoading = pageState === "loading";

  const [showLoading, setShowLoading] = useState(isLoading); // - page loading

  const [cartData, setCartData] = useState<Item[]>([]);

  const [isCartDisplayed, setIsCartDisplayed] = useState<boolean>(false); // - modal

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      const timeoutId = setTimeout(() => {
        setShowLoading(false);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isLoading]);

  function handleSetCartData(newData: Item): void {
    setCartData((oldData) => [...oldData, newData]);
  }

  function handleDisplayCart(): void {
    setIsCartDisplayed((oldState) => !oldState);
  }

  return (
    <div className="App">
      <div className="header">
        <>
          <Link to={"/"}>
            <div className="Anything">ANYTHING</div>
          </Link>
        </>

        <div className="categories">
          {categories.map((cat) => (
            <Link to={cat} key={cat} className="category">
              {cat}
            </Link>
          ))}
        </div>

        <button
          onClick={() => {
            handleDisplayCart();
          }}
        >
          Display cart
        </button>
      </div>

      <div className="main">
        {showLoading ? (
          <LoadingPage />
        ) : (
          <Outlet
            context={
              {
                data, // - DisplayItem component
                handleSetCartData, // TODO - to add, when you want to add component !
              } satisfies ContextType
            }
          ></Outlet>
        )}
      </div>
      {isCartDisplayed && (
        <DisplayCart data={cartData} handleDisplayCart={handleDisplayCart} />
      )}
      <div className="footer">footer</div>
    </div>
  );
};

export function useMyContext(): ContextType {
  return useOutletContext<ContextType>();
}
