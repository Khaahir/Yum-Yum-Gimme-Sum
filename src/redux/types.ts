export interface ToggleBool {
  value: boolean;
}

export interface keyData {
  apiKey: string;
}

export interface MenuData {
  name: string;
  price: number;
  ingredients: null;
  type: string;
  id: number;
}

export interface CartProducts {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartProducts[];
}

export interface EtaData {
  id: string;
  eta?: string;
  order?: string;
}
export type FetchStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ApiState {
  apiKey: string;
  menu: MenuData[];
  cartItems: CartProducts[];
  etaValue: EtaData[];
  orderId: string;
  status: FetchStatus;
  error?: string | null;
}
