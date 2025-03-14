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
export const getOrderDetails = async (orderData: any) => {
  // 💡 Kontrollera att orderData innehåller ett orderobjekt och hämta ID korrekt
  const orderId = orderData?.order?.id ?? orderData?.id;

  if (!orderId) {
    console.error("❌ getOrderDetails: Missing order ID in:", orderData);
    throw new Error("Order ID saknas!");
  }

  const apiKey = await fetchApiKey();
  const tenantData = await fetchTenant();

  try {
    const url = `${BaseUrl}/${tenantData.id}/orders/${orderId}`;
    console.log(`🛠 Fetching order details from: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
    });

    console.log("🔄 Response status:", response.status);

    if (!response.ok) {
      throw new Error(`API-fel: ${response.status} - ${response.statusText}`);
    }

    const orderDetails = await response.json();
    console.log("🎉 Order details received from API:", orderDetails.order);

    return orderDetails.order;
  } catch (error: any) {
    console.error("❌ Error fetching order details:", error);
    return { error: error.message };
  }
};
