type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled,
}: ButtonProps) => {
  const base = "px-3 py-1 rounded font-medium transition-colors";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full",
    secondary:
      "bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-full",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
