const baseUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

export const fetchApiKey = async () => {
  const resp = await fetch(`${baseUrl}/keys`, {
    method: "POST",
  });
  const keyData = await resp.json();
  return keyData.key;
};

export const fetchTenant = async (
  key: string,
  name: string
): Promise<{ id: number; name: string }> => {
  const response = await fetch("https://ditt-api.com/tenant", {
    method: "POST",
    headers: {
      "x-zocom": `${key}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tenant information");
  }

  return await response.json(); // 🔥 Return tenant data
};

export const fetchMenu = async (key: string) => {
  const resp = await fetch(`${baseUrl}/menu`, {
    method: "GET",
    headers: { "x-zocom": `${key}` },
  });
  const data = await resp.json();
  return await data.items;
};

export const addToCart = async (Key: string, order: any) => {
  const resp = await fetch(`${baseUrl}/tenant/orders`, {
    method: "POST",
    headers: { "x-zocom": `${Key}` },
    body: JSON.stringify(order),
  });
  return await resp.json();
};

export const fetchOrderStatus = async (key: string, id: number) => {
  const resp = await fetch(`${baseUrl}/ tenant/orders${id}`, {
    method: "GET",
    headers: { "x-zocom": `${key}` },
  });

  return await resp.json();
};
