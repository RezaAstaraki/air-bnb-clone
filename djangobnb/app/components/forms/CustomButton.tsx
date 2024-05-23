import { useFormStatus } from "react-dom";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  // isLoading: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  className,
  // isLoading,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      role="button"
      type="submit"
      disabled={pending}
      onClick={onClick}
      className={`text-center w-full py-4 text-white rounded-xl transition cursor-pointer ${
        pending
          ? "bg-gray-500 hover:bg-gray-500"
          : "bg-airbnb hover:bg-airbnb-dark"
      }${className}`}
    >
      {!pending ? label : "loading"}
    </button>
  );
};

export default CustomButton;
