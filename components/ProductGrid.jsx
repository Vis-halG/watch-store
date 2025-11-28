import ProductCard from './ProductCard';
export default function ProductGrid({ products }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "14px",
        paddingBottom: "20px",
      }}
    >
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            transition: "transform .15s ease",
          }}
        >
          {/* Wrap each card inside a container for hover animation */}
          <div
            style={{
              transition: "transform .15s ease, box-shadow .2s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <ProductCard product={p} />
          </div>
        </div>
      ))}
    </div>
  );
}
