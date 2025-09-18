import axios from "axios";
import findLatestSessionByShop from "../utils/getSession.js";
import dotenv from 'dotenv';

dotenv.config();

const shop = process.env.SHOP;
const session = await findLatestSessionByShop(shop); 
const accessToken = session?.accessToken;
const baseURL = process.env.URL;


const AxiosInstance = axios.create({
  baseURL,
  headers: {
    "X-Shopify-Access-Token": accessToken,
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
