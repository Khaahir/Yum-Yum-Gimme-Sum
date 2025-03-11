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

export const fetchTenant = async () => {
  const diffname = `persson_${Date.now()}`;
  const apiKey = await fetchApiKey();
  const response = await fetch(`${BaseUrl}/tenants`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-zocom": apiKey },
    body: JSON.stringify({ name: `${diffname}` }),
  });

  console.log(apiKey);
  const data = await response.json();
  console.log("tenant data resp: ", data);
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

export const handleCheckout = async (cartItems: CartProducts[]) => {
  const apiKey = await fetchApiKey();

  try {
    const response = await fetch(`${BaseUrl}/{tenant}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify({
        items: cartItems.map((item) => item.id),
      }),
    });

    const etaData = await response.json();
    console.log("Order placed successfully!", etaData);
    return etaData;
  } catch (error) {
    console.error("Error placing order:", error);
  }
};
