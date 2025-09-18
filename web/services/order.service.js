import axios from "axios";
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export async function isOrderWithin(time) {
  try {
    const since = new Date(Date.now() - time * 60 * 1000)
      .toISOString()
      .split(".")[0] + "Z";

    const query = `
      query getRecentOrders($query: String!) {
        orders(first: 1, query: $query) {
          nodes { 
            id
            createdAt
          }
        }
      }
    `;

    const variables = {
      query: `created_at:>="${since}"`,
    };

    const data = JSON.stringify({ query, variables });

    // Axios config
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL}/admin/api/${process.env.API_VERSION}/graphql.json`,
      headers: {
        "X-Shopify-Access-Token": process.env.AT,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    const orders = response?.data?.data?.orders?.nodes || [];

    return orders.length > 0;
  } catch (error) {
    console.error(
      "Error getting recent orders count:",
      error?.response?.data || error.message
    );
    throw error;
  }
}
