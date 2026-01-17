import React, { useState } from "react";
import "./contact.css";

export default function Contact_B() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageData: "",
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // search, filter, sort states
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct((prev) => ({ ...prev, imageData: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!product.name || !product.price || !product.category) {
      alert("Fill all fields");
      return;
    }

    if (editIndex === null) {
      setProducts([...products, product]);
    } else {
      const updated = [...products];
      updated[editIndex] = product;
      setProducts(updated);
      setEditIndex(null);
    }

    setProduct({ name: "", price: "", category: "", imageData: "" });
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleEdit = (p, index) => {
    setProduct(p);
    setEditIndex(index);
  };

  // 🔍 SEARCH + FILTER + SORT
  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      filterCategory ? p.category === filterCategory : true
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  // unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="container">
      <h2>Product Manager</h2>

      {/* FORM */}
      <div className="form">
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        {product.imageData && (
          <img className="preview" src={product.imageData} alt="preview" />
        )}

        <button onClick={handleSubmit}>
          {editIndex === null ? "Add Product" : "Update Product"}
        </button>
      </div>

      {/* SEARCH + FILTER + SORT */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* PRODUCT LIST */}
      <div className="list">
        {filteredProducts.map((p, index) => (
          <div className="card" key={index}>
            <img src={p.imageData} alt="product" />
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>
            <span>{p.category}</span>

            <div className="actions">
              <button className="edit" onClick={() => handleEdit(p, index)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
