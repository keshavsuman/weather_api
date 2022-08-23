import axios, { AxiosResponse } from "axios";
import weatherModel, { Weather } from "../models/weather.model";

/**
 * @description
 * @param {Number} latitude
 * @param {Number} longitude
 * @param {Boolean} isNew
 * @author Keshav suman
 * @return {Promise<Object>}
 */
export async function fetchWeatherDataAndSaveToDB(
  latitude: number,
  longitude: number,
  isNew: boolean = false
): Promise<Weather | null> {
  const response: AxiosResponse = await axios.get("/weather", {
    baseURL: process.env.weatherApi_base_url,
    params: {
      lat: latitude,
      lon: longitude,
      appid: process.env.weatherApi_key,
    },
  });
  if (isNew) {
    return await weatherModel.create(response.data);
  } else {
    return await weatherModel.findOneAndUpdate(
      {
        coord: {
          lat: latitude,
          lon: longitude,
        },
      },
      response.data
    );
  }
}

/**
 * @description This function is used to save the data to database
 * @author Keshav suman
 * @param {Number} latitude
 * @param {Number} longitude
 * @return {Promise<Weather|null}>}
 */

export async function fetchDatafromDatabase(
  latitude: number,
  longitude: number
): Promise<Weather | null> {
  console.log({
    lat: latitude,
    lon: longitude,
  });
  const data: Weather | null = await weatherModel.findOne({
    coordinate: {
      lat: latitude,
      lon: longitude,
    },
  });
  return data;
}
