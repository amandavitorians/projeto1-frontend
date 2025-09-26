import axios from "axios";

const API_BASE = "https://api.thecatapi.com/v1";

export async function searchCats({ q, limit = 12 }) {
  const url = `${API_BASE}/images/search?limit=${limit}`;
  const response = await axios.get(url);
  return response.data;
}

export async function getBreeds() {
  const url = `${API_BASE}/breeds`;
  const response = await axios.get(url);
  return response.data;
}