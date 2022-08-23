import { Request, Response } from "express";
import { fetchWeatherDataAndSaveToDB, fetchDatafromDatabase } from "../service";
import moment from "moment";
import httpStatus from "http-status";

export async function startDatafetchingController(req: Request, res: Response) {
  const body = req.body;
  const searchBody: any = {
    lat: parseFloat(body.latitude.toFixed(4)),
    lon: parseFloat(body.longitude.toFixed(4)),
  };

  // Fetching data from database
  const data = await fetchDatafromDatabase(searchBody.lat, searchBody.lon);
  let response: any;

  if (!data) {
    response = await fetchWeatherDataAndSaveToDB(
      searchBody.lat,
      searchBody.lon,
      true
    );
  } else {
    const diffrence = moment(moment.now()).diff(
      moment(data?.updatedAt),
      "minute"
    );
    if (diffrence > 10) {
      response = await fetchWeatherDataAndSaveToDB(
        searchBody.lat,
        searchBody.lon
      );
    } else {
      response = data;
    }
  }

  res.status(httpStatus.OK).send({
    statusCode: httpStatus.OK,
    data: response,
  });
}
