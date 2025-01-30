import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useSearchParams } from "react-router";
import { getForcastForDays } from "../api/weather";
import WeatherList from "../components/WeatherList";

export default function LocationDetails() {
  // const name = useParams();
  const [searchParams] = useSearchParams();
  const location = searchParams.get("q");

  const { data, isLoading, error } = useQuery({
    queryKey: ["forcast-details", location],
    queryFn: () => getForcastForDays(location!),
    enabled: location !== null,
  });

  useEffect(() => {
    if (error) {
      toast.error(error?.message, {
        id: "add error",
      });
      // console.log(currentDataError?.message);
    }
  }, [error]);

  return (
    <div className="h-screen w-screen px-4 py-3 md:px-10 md:py-10 space-y-4">
      <div className="flex items-center">
        <div className=" flex-1 text-center">
          <h3 className="font-bold text-xl">
            {data?.location?.name + ", " + data?.location?.country}
          </h3>
        </div>
        <div>
          <IoEllipsisHorizontalSharp size={24} />
        </div>
      </div>

      <div className="text-center space-y-5 mt-10">
        <h4 className="font-bold text-4xl">{data?.current?.temp_c}°</h4>
        <p className="text-xl">{data?.current?.condition?.text}</p>
        <p className="space-x-4 text-lg">
          <span>
            H: <span>{data?.forecast?.forecastday[0]?.day?.maxtemp_c}°</span>
          </span>
          <span>
            L: <span>{data?.forecast?.forecastday[0]?.day?.mintemp_c}°</span>
          </span>
        </p>
      </div>
      <div className="space-y-3">
        <h4 className="font-bold text-lg">5-day forecast</h4>
        <div className="space-y-4">
          {!isLoading &&
            data &&
            data.forecast.forecastday.map((item, index) => {
              return (
                <WeatherList
                  key={index}
                  tempRange={
                    item?.day?.mintemp_c + "° - " + item?.day?.maxtemp_c + "°"
                  }
                  days={index === 0 ? "Today" : getDay(item?.date)}
                  imgUrl={item?.day?.condition?.icon}
                />
              );
            })}
          {isLoading && (
            <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters size={24} className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getDay(val: string) {
  const date = new Date(val);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  return dayOfWeek;
}
