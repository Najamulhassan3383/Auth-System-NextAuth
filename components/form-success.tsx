import { IoCheckmarkDoneCircle } from "react-icons/io5";

interface FormSuccessProps {
  message?: string;
}

function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="flex items-center text-green-400 text-md rounded-md  bg-green-100 p-3">
      <IoCheckmarkDoneCircle className="mr-1 h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}

export default FormSuccess;
