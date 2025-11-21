import React from "react";
import InventoryTable from "../components/InventoryTable";

function Product() {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <div className="mt-7 max-w-7xp mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <InventoryTable />
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <p className="p-10">Please sign in first</p>
        </div>
      )}
    </div>
  );
}

export default Product;
