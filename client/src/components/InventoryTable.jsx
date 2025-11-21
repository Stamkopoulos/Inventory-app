"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/clerk-react";
import EditItemModal from "./EditItemModal";
import CreateItemModal from "./CreateItemModal";

function InventoryTable() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [creatingItem, setCreatingItem] = useState(null);

  const { getToken } = useAuth();

  const fetchItems = async () => {
    const token = await getToken();
    const res = await fetch("http://localhost:4000/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:4000/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete item");
      } else {
        // Refresh the items list after deletion
        fetchItems();
      }

      //    if (!res.ok) {
      //   console.error("Failed to delete item");
      //   return;
      // }

      // // Ενημέρωση UI
      // setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch {
      console.log("Error deleting item");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input placeholder="Filter products..." className="pl-10" />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />

        <Button className="ml-auto" onClick={() => setCreatingItem({})}>
          Add Item
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right ">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              {/* Image Cell */}
              <TableCell>
                <div className="w-10 h-10 overflow-hidden rounded border border-gray-200">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No Image</span>
                  )}
                </div>
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell className="font-bold">{item.stock}</TableCell>

              <TableCell className="text-right">
                <div className="flex  justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setEditingItem(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this item?")
                      ) {
                        deleteItem(item.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={fetchItems}
        />
      )}

      {creatingItem && (
        <CreateItemModal
          item={creatingItem}
          onClose={() => setCreatingItem(null)}
          onUpdate={fetchItems}
        />
      )}
    </div>
  );
}

export default InventoryTable;
