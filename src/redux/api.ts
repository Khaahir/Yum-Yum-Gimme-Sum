import { CartProducts } from "./types";
const BaseUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
export const fetchApiKey = async () => {
  const response = await fetch(`${BaseUrl}/keys`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  const apiKey = data;
  return apiKey;
};
const apiKey = await fetchApiKey();

export const fetchTenant = async () => {
  const TenantId = `persson_${Date.now()}`;
  // const TenantId = "hulk";
  const response = await fetch(`${BaseUrl}/tenants`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-zocom": apiKey },
    body: JSON.stringify({ name: `${TenantId}` }),
  });

  const tenantData = await response.json();
  return tenantData;
};

export const fetchMenu = async () => {
  const apiKey = await fetchApiKey();
  const response = await fetch(`${BaseUrl}/menu`, {
    method: "GET",
    headers: { "x-zocom": apiKey },
  });
  const data = await response.json();
  return data.items;
};

export const sendOrder = async (cartItems: CartProducts[]) => {
  const TenantId = await fetchTenant();
  try {
    const response = await fetch(`${BaseUrl}/${TenantId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },

      body: JSON.stringify({
        items: cartItems.map((item) => item.id),
      }),
    });

    console.log("Sending items:", cartItems);
    const Data = await response.json();
    const orderId = Data.order.id;
    console.log("Order placed successfully!", Data, "and id is ", orderId);
    return orderId;
  } catch (error) {
    console.error("Error placing order:", error);
  }
};

export const getOrderDetails = async () => {
  const tenantData = await fetchTenant(); // Ensure correct tenant is used
  console.log(`Fetching details for order ID: ${"0z01oduy"}`);

  try {
    const response = await fetch(`${BaseUrl}/${tenantData}/orders/0z01oduy`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
    });

    const orderDetails = await response.json();
    console.log("Order details received:", orderDetails);
    console.log("0z01oduy");

    return orderDetails;
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};
