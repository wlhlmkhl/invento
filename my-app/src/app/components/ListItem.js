import { useState } from "react";

export default function ListItem(props) {
  const { data, onDelete, onUpdate } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    name: data.name,
    description: data.description,
    quantity: data.quantity,
    category: data.category,
  });

  const handleDelete = () => {
    onDelete(data.id);
  };

  const handleUpdate = async () => {
    try {
      await onUpdate({ ...data, ...updatedItem });
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating item:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Namn
            </label>
            <input
              type="text"
              id="name"
              value={updatedItem.name}
              onChange={(e) =>
                setUpdatedItem({ ...updatedItem, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Beskrivning
            </label>
            <input
              type="text"
              id="description"
              value={updatedItem.description}
              onChange={(e) =>
                setUpdatedItem({ ...updatedItem, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Mängd
            </label>
            <input
              type="number"
              id="quantity"
              value={updatedItem.quantity}
              onChange={(e) =>
                setUpdatedItem({
                  ...updatedItem,
                  quantity: Number(e.target.value),
                })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Kategori
            </label>
            <select
              id="category"
              value={updatedItem.category}
              onChange={(e) =>
                setUpdatedItem({ ...updatedItem, category: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="Verktyg">Verktyg</option>
              <option value="Material">Material</option>
              <option value="Utrustning">Utrustning</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
            >
              Spara
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white rounded-lg py-2 px-4 hover:bg-gray-600 transition duration-200"
            >
              Avbryt
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-gray-800 font-semibold">{data.name}</h3>
          <p className="text-gray-600">{data.description}</p>
          <p className="text-gray-600">Mängd: {data.quantity}</p>
          <p className="text-gray-600">Kategori: {data.category}</p>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
