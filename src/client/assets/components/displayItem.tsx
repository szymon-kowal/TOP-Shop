import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "./Root";

const DisplayItems: React.FC = () => {
  const { category } = useParams();
  const { data } = useData();
  return (
    <div className="itemCont">
      {data.map((item) => {
        if (category !== undefined) {
          if (item.category !== category) {
            return null;
          }
        }

        return (
          <div className="dataItem" key={item.id}>
            <img src={item.image} alt={item.title} width={100} height={100} />
            <div className="underPhoto">
              <div className="title">{item.title}</div>
              <div className="price">{item.price + " $"}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayItems;
