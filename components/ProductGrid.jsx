import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <p style={{ fontSize: '12px', color: '#777', textAlign: 'center' }}>
        No watches found.
      </p>
    );
  }
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
