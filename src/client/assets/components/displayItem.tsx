import React from "react";
import { useParams, Link } from "react-router-dom";
import { useMyContext } from "../pages/Root";

const DisplayItems: React.FC = () => {
  const { category } = useParams();
  const { data } = useMyContext();
  return (
    <div className="itemCont">
      {data.map((item) => {
        if (category !== undefined) {
          if (item.category !== category) {
            return null;
          }
        }

        return (
          <Link to={`/${category}/${item.id}`} key={item.id}>
            <div className="dataItem">
              <img src={item.image} alt={item.title} width={100} height={100} />
              <div className="underPhoto">
                <div className="title">{item.title}</div>
                <div className="price">{item.price + " $"}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default DisplayItems;
