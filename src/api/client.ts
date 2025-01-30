// utils/fetchRequest.ts
const BASE_URL = "https://api.weatherapi.com/v1";
export const fetchRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error?.error?.message);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
};
