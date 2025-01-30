import { FaPlus } from "react-icons/fa";
import Button from "../components/Button";
import { Link } from "react-router";
import useStore from "../store/useStore";
import LocationList from "../components/LocationList";
import { useQuery } from "@tanstack/react-query";
import { GetCurrentWeather } from "../types";
import { getCurrentForLocationList } from "../api/weather";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Home() {
  const { location, removeLocation: removeUserLocation } = useStore();
  const params = extractLatLon(location);
  const { data, isLoading } = useQuery({
    queryKey: ["locationList"],
    queryFn: () => getCurrentForLocationList(params),
  });

  useEffect(() => {
    if (!isLoading && data && data?.length > 0) {
      removeUserLocation(data);
    }
  }, [data, isLoading, removeUserLocation]);

  const removeLocation = (lat: number, long: number) => {
    const newLocations = location.filter(
      (item) => item.location.lat !== lat || item.location?.lon !== long
    );
    removeUserLocation(newLocations);
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-4 px-5 py-3 md:px-10 md:py-10">
      <div className="flex items-center justify-end ">
        <Link to={"/add"}>
          <FaPlus />
        </Link>
      </div>
      <div>
        <h3 className="font-bold text-3xl">Weather</h3>
      </div>
      {/* Location List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {!isLoading &&
          location.map((item, index) => {
            return (
              <LocationList
                location={item?.location?.name + ", " + item?.location?.country}
                weather={
                  String(item?.current?.temp_c) +
                  "°, " +
                  item?.current?.condition.text
                }
                imgUrl={item?.current?.condition?.icon}
                key={index}
                handleDelete={() =>
                  removeLocation(item?.location?.lat, item?.location?.lon)
                }
                link={`/location/${item?.location?.name}?q=${item?.location?.lat},${item.location?.lon}`}
              />
            );
          })}
        {isLoading && (
          <div className="flex items-center justify-center">
            <AiOutlineLoading3Quarters size={24} className="animate-spin" />
          </div>
        )}
        {!isLoading && location?.length === 0 && (
          <p className="text-center">No Location added yet</p>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Link to={"/add"} className="w-full cursor-pointer">
          <Button className="cursor-pointer">Add Location</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

function extractLatLon(data: GetCurrentWeather[]): string[] {
  return data.map(({ location }) => `${location.lat},${location.lon}`);
}
