import { GoTrash } from "react-icons/go";
import { Link } from "react-router";

type Props = {
  imgUrl: string;
  location: string;
  weather: string;
  handleDelete: () => void;
  link: string;
};

function LocationList({
  imgUrl,
  location,
  weather,
  handleDelete,
  link,
}: Props) {
  return (
    <Link to={link}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-22 w-35 rounded-[20px] overflow-hidden">
            <img src={imgUrl} className="bg-center" />
          </div>
          <div>
            <h4 className="font-semibold text-[18px] md:text-xl text-black">
              {location}
            </h4>
            <p className="text-[18px] text-gray-500">{weather}</p>
          </div>
        </div>
        <div onClick={handleDelete} className="px-3 py-2">
          <GoTrash size={30} />
        </div>
      </div>
    </Link>
  );
}

export default LocationList;
