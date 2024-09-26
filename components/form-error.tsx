import { BiError } from "react-icons/bi";

interface FormErrorProps {
  message?: string;
}

function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center text-red-400 text-md rounded-md  bg-red-100 p-3">
      <BiError className="mr-1 h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}

export default FormError;
