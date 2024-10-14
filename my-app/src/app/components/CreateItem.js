import { useState } from "react";
import axios from "axios";

export default function CreateItem() {
  const [input1, setInput1] = useState(""); // Namn
  const [input2, setInput2] = useState(""); // Beskrivning
  const [input3, setInput3] = useState(""); // Mängd
  const [selectedCategory, setSelectedCategory] = useState(""); // För valt kategori
  const [error, setError] = useState(""); // För att hantera eventuella fel

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name: input1,
      description: input2,
      quantity: Number(input3), // Omvandlar till nummer
      category: selectedCategory, // Använd den valda kategorin
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/item",
        newItem
      );
      console.log("Item created:", response.data);
      // Resetting the input fields after successful submission
      setInput1("");
      setInput2("");
      setInput3("");
      setSelectedCategory(""); // Återställ den valda kategorin
    } catch (error) {
      console.error("Error creating item:", error);
      setError("Ett fel inträffade vid skapandet av objektet.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4">Skapa ett nytt objekt</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="input1">
          Namn
        </label>
        <input
          type="text"
          id="input1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Skriv namn..."
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="input2">
          Beskrivning
        </label>
        <input
          type="text"
          id="input2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Skriv beskrivning..."
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="input3">
          Mängd
        </label>
        <input
          type="number"
          id="input3"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Skriv mängd..."
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="categorySelect">
          Kategori
        </label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        >
          <option value="" disabled>
            Välj kategori...
          </option>
          <option value="Verktyg">Verktyg</option>
          <option value="Material">Material</option>
          <option value="Utrustning">Utrustning</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold rounded-lg p-2 hover:bg-blue-600 transition duration-200"
      >
        Create
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
