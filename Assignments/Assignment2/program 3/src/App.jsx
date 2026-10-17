
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from REST API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Add product to cart
  function addToCart(product) {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: (prevCart[product.id] || 0) + 1
    }));
  }

  // Increase quantity
  function increaseQuantity(id) {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] + 1
    }));
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      if (updatedCart[id] > 1) {
        updatedCart[id]--;
      } else {
        delete updatedCart[id];
      }

      return updatedCart;
    });
  }

  // Calculate total price
  const total = products.reduce((sum, product) => {
    return sum + product.price * (cart[product.id] || 0);
  }, 0);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Error: {error}</h2>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Shopping Cart</h1>

      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: "12px",
            marginBottom: "10px"
          }}
        >
          <h3>{product.title}</h3>

          <p>Price: ${product.price.toFixed(2)}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}

      <hr />

      <h2>Your Cart</h2>

      {products.filter((product) => cart[product.id]).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        products
          .filter((product) => cart[product.id])
          .map((product) => (
            <div key={product.id}>
              <p>
                {product.title} — ${product.price.toFixed(2)}
              </p>

              <button onClick={() => decreaseQuantity(product.id)}>
                -
              </button>

              <span style={{ margin: "0 12px" }}>
                {cart[product.id]}
              </span>

              <button onClick={() => increaseQuantity(product.id)}>
                +
              </button>
            </div>
          ))
      )}

      <h2>Total Price: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default App;
