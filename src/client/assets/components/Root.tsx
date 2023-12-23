import React from "react";
import useFetchCategories from "./hooks/useFetchCategories";
import useFetchData from "./hooks/useFetchData";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import type { Item } from "./interfaces";

type ContextType = {
  data: Item[];
};

export const Root: React.FC = () => {
  const { data: categories } = useFetchCategories(
    "https://fakestoreapi.com/products/categories"
  );

  const { data, pageState } = useFetchData("https://fakestoreapi.com/products");

  // const isError = pageState === 'error';
  // const isLoading = pageState === 'loading';
  // console.log(categoryUrl);
  // TODO : return different components on different pageState
  return (
    <div className="App">
      <div className="header">
        <>
          <Link to={"/"}>
            <div className="Anything">ANYTHING</div>
          </Link>
        </>
        <div className="categories">
          <div>{pageState}</div>
          {categories.map((cat) => (
            <Link to={cat} key={cat} className="category">
              {cat}
            </Link>
          ))}
        </div>
      </div>
      <div className="main">
        <Outlet context={{ data } satisfies ContextType}></Outlet>
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export function useData() {
  return useOutletContext<ContextType>();
}
