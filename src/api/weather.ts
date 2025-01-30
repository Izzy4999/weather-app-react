import { GetCurrentWeather, GetForcastForDays, Location } from "../types";
import { fetchRequest } from "./client";

const apiKey = import.meta.env.VITE_WEATHER_API;

export const search = async (search: string) => {
  const response = await fetchRequest<Location[]>(
    `/search.json?key=${apiKey}&q=${search}`
  );

  return response;
};

export const currentWeather = async (location: string) => {
  const response = await fetchRequest<GetCurrentWeather>(
    `/current.json?key=${apiKey}&q=${location}&aqi=no`
  );
  return response;
};

export async function getForcastForDays(location: string) {
  const response = await fetchRequest<GetForcastForDays>(
    `/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`
  );
  return response;
}

export const getCurrentForLocationList = async (params: string[]) => {
  try {
    const requests = params.map((param) => currentWeather(param));

    
    const responses = await Promise.all(requests);
    console.log(responses)

    // Extracting data from each response
    return responses;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return;
  }
};
