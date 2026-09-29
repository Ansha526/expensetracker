import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [newProductInfo, setNewProductInfo] = useState({
    id: "",
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
  });

  const handleProductInfoChange = (e) => {
    setNewProductInfo((prev) => ({...prev, [e.target.name] : e.target.value }));
  };



  async function fetchProducts() {
    try {
      console.log("1. API calling...");

      const response = await fetch("http://localhost:5050/products");
      setProducts(productRes.data);
      console.log(productRes.data)


      console.log("2. Response received:", response);
      console.log("3. Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("4. API DATA:", data);

      setProducts(data);
    } catch (error) {
      console.error("5. API ERROR:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function addProduct(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5050/products", newProductInfo);
      alert ("Product Added")
    }  
    catch (err) {
      console.log(err)
    }
  }

  async function deleteProduct(id) {
    try{
      await axios.delete(`http//localhost:5050/products/${id}`);
      alert ("Product Deleted");
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold p-5">
        Expense Tracker
      </h1>

      <form onSubmit={addProduct}> 
        <input type="text" name="id" id="id" placeholder="Enter your id" onChange={handleProductInfoChange} />
        <input type="text" name="name" id="name"  placeholder="Enter your name" onChange={handleProductInfoChange} />
        <input type="number" name="price" id="price"  placeholder="Enter your price" onChange={handleProductInfoChange} />
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Enter your image url" onChange={handleProductInfoChange} />
        <input type="text" name="description" id="description" placeholder="Enter your Description" onChange={handleProductInfoChange} />
        <button type="submit">save</button>
      </form>

      <div className="p-5">
        <h2 className="text-xl font-bold mb-3">
          API Products
        </h2>

        {products.map((product) => (
          <div key={product.id} className="p-3 border mb-2">
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;