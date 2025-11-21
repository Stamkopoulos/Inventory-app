"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Search } from "lucide-react";

export default function CreateItemModal({ item, onClose, onUpdate }) {
  const { getToken } = useAuth();
  const [data, setData] = useState({ ...item });
  const [categories, setCategories] = useState([]);

  // fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      const token = await getToken();
      const res = await fetch("http://localhost:4000/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const result = await res.json();
        setCategories(result);
      }
    };
    fetchCategories();
  }, []);

  const handleSave = async () => {
    const token = await getToken();
    const res = await fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      onUpdate();
      onClose();
    } else {
      console.error("Failed to create item");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {/* <DialogContent className="w-full sm:max-w-[900px]"> */}
      <DialogContent className="w-full sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Image Box */}
          <div className="w-full sm:w-56 h-56 sm:h-56 border border-gray-300 rounded flex items-center justify-center bg-gray-100 overflow-hidden">
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt={data.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          {/* Form Inputs */}
          <div className="flex-1 space-y-3 w-full">
            {/* Name */}
            <div>
              <Label className="block text-sm font-medium mb-1">Name</Label>
              <Input
                className="w-full"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Name"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="block text-sm font-medium mb-1">Category</Label>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full sm:max-w-sm">
                  <Input
                    className="w-full pl-10"
                    placeholder="Search category..."
                    value={data.category || ""}
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  />
                  <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <Combobox
                  value={data.category}
                  onChange={(val) => setData({ ...data, category: val })}
                  options={categories}
                  allowCustom={true}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="block text-sm font-medium mb-1">
                Description
              </Label>
              <Input
                className="w-full"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                placeholder="Description"
              />
            </div>

            {/* Stock */}
            <div>
              <Label className="block text-sm font-medium mb-1">Stock</Label>
              <Input
                className="w-full"
                type="number"
                value={data.stock}
                onChange={(e) =>
                  setData({ ...data, stock: parseInt(e.target.value) })
                }
                placeholder="Stock"
              />
            </div>

            {/* Price */}
            <div>
              <Label className="block text-sm font-medium mb-1">Price</Label>
              <Input
                className="w-full"
                type="number"
                value={data.price}
                onChange={(e) =>
                  setData({ ...data, price: parseFloat(e.target.value) })
                }
                placeholder="Price"
              />
            </div>

            {/* Image URL */}
            <div>
              <Label className="block text-sm font-medium mb-1">
                Image URL
              </Label>
              <Input
                className="w-full"
                value={data.imageUrl}
                onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
                placeholder="Image URL"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
