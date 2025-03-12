import { data } from "react-router-dom";
import { CartProducts, EtaData } from "./types";
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

export const fetchTenant = async () => {
  const apiKey = await fetchApiKey();
  const TenantId = `persson_${Date.now()}`;
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
let Data: EtaData;
export const sendOrder = async (cartItems: CartProducts[]) => {
  const apiKey = await fetchApiKey();
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
    Data = await response.json();

    return Data;
  } catch (error) {
    console.error("Error placing order:", error);
  }
};
export const getOrderDetails = async (Data: EtaData) => {
  const apiKey = await fetchApiKey();
  const tenantData = await fetchTenant();
  console.log(`Fetching details for order ID: ${Data}`);

  try {
    const response = await fetch(`${BaseUrl}/${tenantData}/orders/${Data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
    });

    const orderDetails = await response.json();
    console.log("Order details received:", orderDetails);
    return orderDetails;
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};
