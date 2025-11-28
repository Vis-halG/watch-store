export default function Input({ type, placeholder, onChange }) {
  return (
    <div className="input-box">
      <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}
