import AxiosInstance from "./axios.js";

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

    const res = await AxiosInstance.post("", {
      query,
      variables,
    });

    const orders = res.data?.data?.orders?.nodes || [];

    return orders.length > 0;
  } catch (error) {
    console.error("Error getting recent orders count:", error?.response?.data || error.message);
    throw error;
  }
}
