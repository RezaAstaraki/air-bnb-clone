interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  isLoading: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  className,
  isLoading,
}) => {
  return (
    <button
      role="button"
      type="submit"
      disabled={isLoading}
      onClick={onClick}
      className={`text-center w-full py-4 text-white rounded-xl transition cursor-pointer ${
        isLoading
          ? "bg-gray-500 hover:bg-gray-500"
          : "bg-airbnb hover:bg-airbnb-dark"
      }${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
