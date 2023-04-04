import React, { useState, useEffect } from 'react';
import './ProductForm.css';

function ProductForm() {
  const [productId, setProductId] = useState('');
  const [sellingPrice, setSellingPrice] = useState(0);
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const newTotalValue = products.reduce((acc, cur) => acc + cur.price, 0);
    setTotalValue(newTotalValue);
  }, [products]);

  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  const handleSellingPriceChange = (event) => {
    setSellingPrice(parseFloat(event.target.value));
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: productId,
      name: productName,
      price: sellingPrice
    };

    setProducts([...products, newProduct]);
    setProductId('');
    setProductName('');
    setSellingPrice(0);
  };

  const handleDeleteProduct = (productId, price) => {
    setProducts(products.filter((product) => product.id !== productId));
    setTotalValue(totalValue - price);
    const updatedProducts = products.filter((prod) => prod.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="product-form">
      <h1>Add a new product</h1>

      <div className="form-row">
        <label htmlFor="product-id">Product ID:</label>
        <input
          type="text"
          id="product-id"
          value={productId}
          onChange={handleProductIdChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="selling-price">Selling Price:</label>
        <input
          type="number"
          id="selling-price"
          value={sellingPrice}
          onChange={handleSellingPriceChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="product-name">Product Name:</label>
        <input
          type="text"
          id="product-name"
          value={productName}
          onChange={handleProductNameChange}
        />
      </div>

      <div className="form-row">
        <button onClick={handleAddProduct}>Add product</button>
      </div>

      <div className="product-list">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}{' '}
              <button onClick={() => handleDeleteProduct(product.id, product.price)}>
                Delete Product
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="total-value">
        <h2>Total Value of Products</h2>
        <p>${totalValue}</p>
      </div>
    </div>
  );
}

export default ProductForm;
