import { FC } from 'react';
import { ImSpinner2 } from 'react-icons/im';

interface IButtonProps {
  title: string;
  loading: boolean;
}
const Button: FC<IButtonProps> = ({ title, loading }: IButtonProps) => {
  return (
    <button
      className="flex items-center justify-between bg-blue-500 custom-hover text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-blue-700"
      type="submit"
      disabled={loading}
    >
      {loading && <ImSpinner2 className="icon-spin mr-2" />}

      {title}
    </button>
  );
};

export default Button;
