import { IoMdClose } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";
import Button from "../components/Button";
import Input from "../components/Input";
import { useEffect, useRef, useState } from "react";
import SearchList from "../components/SearchList";
import { useQuery } from "@tanstack/react-query";
import { currentWeather, search } from "../api/weather";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDebounce } from "../hook/useDebounce";
import useStore from "../store/useStore";
import { Location } from "../types";
import toast from "react-hot-toast";

export default function AddLocation() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const searchValue = useDebounce(value, 1500);
  const [selectedLocation, setSelectedLocation] = useState("");
  const { setLocation, location } = useStore();
  const [searchResult, setSearchResult] = useState<Location[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["search", value],
    queryFn: () => search(searchValue),
    enabled: searchValue?.trim().length > 0,
  });

  const {
    data: currentData,
    isLoading: currentDataLoading,
    error: currentDataError,
    isSuccess,
  } = useQuery({
    queryKey: ["current", selectedLocation],
    queryFn: () => currentWeather(selectedLocation),
    enabled: selectedLocation?.trim().length > 0,
  });

  useEffect(() => {
    if (isSuccess && currentData && !currentDataError) {
      setLocation(currentData);
      navigate("/");
      return;
    }

    if (currentDataError) {
      toast.error(currentDataError?.message, {
        id: "add error",
      });
      // console.log(currentDataError?.message);
    }
  }, [currentData, isSuccess, currentDataError, navigate, setLocation]);

  useEffect(() => {
    if (data) {
      const filteredData = data?.filter(
        (item) =>
          !location.some(
            (val) =>
              val.location.name === item.name &&
              val.location.region === item.region &&
              val.location.country === item.country
          )
      );
      setSearchResult(filteredData);
    }
  }, [data, location]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAddLocation = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <div className="h-screen w-screen py-3 px-5 md:px-10 md:py-10 space-y-3">
      <div className="flex items-center">
        <div></div>
        <div className="flex-1 text-center">
          <h3 className="font-bold text-3xl">Add Location</h3>
        </div>
        <div>
          <Button
            onClick={() => navigate("/")}
            className="bg-transparent px-4 py-3"
          >
            <IoMdClose size={20} />
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <Input
          ref={inputRef}
          leftIcon={<CiSearch size={24} className="text-sky-400" />}
          value={value}
          rightIcon={
            value.trim().length > 0 && (
              <MdOutlineCancel
                size={24}
                className="text-sky-400"
                onClick={() => setValue("")}
              />
            )
          }
          onChange={handleChange}
        />
      </div>
      <div>
        {!isLoading &&
          searchResult.map((item, key) => {
            return (
              <SearchList
                location={item?.name + "," + item?.region + "," + item?.country}
                handleClick={
                  currentDataLoading
                    ? undefined
                    : () => handleAddLocation(`${item?.lat},${item.lon}`)
                }
                isLoading={
                  selectedLocation === `${item?.lat},${item.lon}`
                    ? currentDataLoading
                    : false
                }
                key={key}
              />
            );
          })}
        {isLoading && (
          <div className="flex items-center justify-center">
            <AiOutlineLoading3Quarters size={24} className="animate-spin" />
          </div>
        )}
        {!isLoading && data && searchResult?.length === 0 && (
          <p className="text-center">Location not found</p>
        )}
      </div>
    </div>
  );
}
