import React from "react";
import useFetchData from "./assets/components/hooks/useFetchData";
import useFetchCategories from "./assets/components/hooks/useFetchCategories";
import DisplayItems from "./assets/components/displayItem";

const App: React.FC = () => {
  const { data: categories } = useFetchCategories(
    "https://fakestoreapi.com/products/categories"
  );
  const { data, pageState } = useFetchData("https://fakestoreapi.com/products");

  // const isError = pageState === 'error';
  // const isLoading = pageState === 'loading';

  return (
    <div className="App">
      <div className="header">
        <>
          <div className="Anything">ANYTHING</div>
        </>
        <div className="categories">
          {categories.map((cat) => (
            <div className="category">{cat}</div>
          ))}
        </div>
      </div>
      <div className="main">
        <div>{pageState}</div>
        <DisplayItems data={data} filter={"null"} />
      </div>
      {categories}
      <div className="footer">footer</div>
    </div>
  );
};

export default App;
