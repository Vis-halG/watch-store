'use client';
import { useCart } from './CartContext';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card">
        <img src={product.image_url} alt={product.name} />
        <div className="name">{product.name}</div>
        <div className="brand">{product.brand}</div>
        <div className="card-footer">
          <span>₹{product.price.toLocaleString('en-IN')}</span>
          <button
            className="add-btn"
            onClick={(e) => {
              e.preventDefault(); // 🔴 stop link click when adding to cart
              addToCart(product);
            }}
          >
            + Add
          </button>
        </div>
      </div>
    </Link>
  );
}
