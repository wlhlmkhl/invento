import ListItem from "./ListItem";
import { useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  const [list, setList] = useState([]);
  const [filterQuantity, setFilterQuantity] = useState(false); // Filter by quantity presence
  const [filterCategory, setFilterCategory] = useState(""); // Selected category

  useEffect(() => {
    const fetcher = async () => {
      const url = "http://localhost:3000/api/item";
      const res = await axios.get(url);
      setList(res.data.data);
    };
    fetcher();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/item/${id}`);
      setList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/item/${updatedItem.id}`,
        updatedItem
      );
      setList((prevList) =>
        prevList.map((item) =>
          item.id === updatedItem.id ? response.data : item
        )
      );
    } catch (error) {
      console.log("Error updating item:", error);
    }
  };

  const filteredList = list.filter((item) => {
    const matchesQuantity = filterQuantity ? item.quantity > 0 : true;
    const matchesCategory = filterCategory
      ? item.category === filterCategory
      : true;
    return matchesQuantity && matchesCategory;
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Item List</h2>

      {/* Filter controls */}
      <div className="mb-4 flex justify-between items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filterQuantity}
            onChange={(e) => setFilterQuantity(e.target.checked)}
            className="mr-2"
          />
          Finns mängd
        </label>

        <label className="flex items-center">
          Kategori:
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="ml-2 border border-gray-300 rounded-lg p-2"
          >
            <option value="">Alla</option>
            <option value="Verktyg">Verktyg</option>
            <option value="Material">Material</option>
            <option value="Utrustning">Utrustning</option>
          </select>
        </label>
      </div>

      {/* Render filtered list */}
      <div>
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <ListItem
              key={item.id}
              data={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">Inga objekt funna.</p>
        )}
      </div>
    </div>
  );
}
