import { CITY_LIMITS, OpenWeatherMap_API_BASE_URL } from '@/constants';
import axios from 'axios';
import { CityLocationData } from "@/interfaces/cityLocationData.ts";

export const getGeoLocation = async (q: string): Promise<CityLocationData[]> => {
  const value = await axios.get(`${OpenWeatherMap_API_BASE_URL}/geo/1.0/direct`, {
    params: { q, appid: import.meta.env.VITE_API_KEY, limit: CITY_LIMITS },
  });
  return value.data;
};
