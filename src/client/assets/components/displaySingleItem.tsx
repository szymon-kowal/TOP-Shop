import React from "react";
import { useParams } from "react-router-dom";
import { useMyContext } from "../pages/Root";
import type { Item } from "./interfaces";

const DisplaySingleItem: React.FC = () => {
  const { item: itemID } = useParams();
  const { data } = useMyContext();

  const findItem = data.find((item) => item.id.toString() === itemID) satisfies
    | Item
    | undefined;

  if (findItem == null || findItem === undefined) return <>No item found</>;

  return <>{findItem.title}</>;
};

export default DisplaySingleItem;
