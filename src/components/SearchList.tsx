import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";

type Props = {
  location: string;
  handleClick?: () => void;
  isLoading?: boolean;
};

export default function SearchList({
  location,
  handleClick,
  isLoading,
}: Props) {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="bg-gray-100 px-3 rounded-md py-2">
        <SlLocationPin size={30} />
      </div>
      <div className="flex-1">
        <p>{location}</p>
      </div>
      {isLoading ? (
        <div>
          <AiOutlineLoading3Quarters size={24} className="animate-spin" />
        </div>
      ) : (
        <div onClick={handleClick} className="px-2 py-2">
          <GoPlus size={30} />
        </div>
      )}
    </div>
  );
}
