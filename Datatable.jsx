import React, { useState } from "react";
import "./table.css";

const initialData = [
  { id: 1, name: "Laptop", price: 60000, category: "Electronics" },
  { id: 2, name: "Mobile", price: 25000, category: "Electronics" },
  { id: 3, name: "Shoes", price: 3000, category: "Fashion" },
  { id: 4, name: "Watch", price: 5000, category: "Fashion" },
  { id: 5, name: "Book", price: 500, category: "Education" },
];

export default function DataTable() {
  const [data] = useState(initialData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      category ? item.category === category : true
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (sortOrder === "asc") return a[sortKey] > b[sortKey] ? 1 : -1;
      return a[sortKey] < b[sortKey] ? 1 : -1;
    });

  const categories = [...new Set(data.map((i) => i.category))];

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container">
      <h2>Data Table</h2>

      {/* Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => handleSort("name")}>Name </th>
            <th onClick={() => handleSort("price")}>Price </th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>₹ {item.price}</td>
                <td>{item.category}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
