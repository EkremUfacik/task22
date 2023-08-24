import axios from "axios";
import { Request, Response } from "express";

const getBreweries = async (req: Request, res: Response) => {
  try {
    const breweryApi = "https://api.openbrewerydb.org/breweries";
    const query = req.query.query as string;

    if (!query) {
      const response = await axios.get(breweryApi);
      res
        .status(200)
        .json({ message: "Fetched successfully", data: response.data });
    } else {
      const response = await axios.get(`${breweryApi}/search?query=${query}`);
      res
        .status(200)
        .json({ message: "Fetched successfully", data: response.data });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

export { getBreweries };
