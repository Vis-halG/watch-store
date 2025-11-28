'use client';

export default function Button({ text, onClick, type = 'button', outline, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={outline ? 'btn-outline' : 'btn-primary'}
      disabled={disabled}
      style={disabled ? { opacity: 0.5 } : {}}
    >
      {text}
    </button>
  );
}
