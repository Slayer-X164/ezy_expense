import React from "react";
import BudgetCardById from "./components/BudgetCardById";

const EachExpensePage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  console.log("in EachExpensePage", id);

  return <BudgetCardById id={id} />;
};

export default EachExpensePage;
