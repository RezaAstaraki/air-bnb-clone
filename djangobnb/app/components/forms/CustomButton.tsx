import { useFormStatus } from "react-dom";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  className,
  isLoading,
  disabled,
  type = "submit",
}) => {
  return (
    <button
      role="button"
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`text-center w-full py-4 text-white rounded-xl transition cursor-pointer ${
        isLoading || disabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-airbnb hover:bg-airbnb-dark"
      } ${className}`}
    >
      {!isLoading ? label : "loading"}
    </button>
  );
};

export default CustomButton;
