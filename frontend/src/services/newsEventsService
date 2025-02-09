const API_URL = "http://localhost:5001/api/news-events";

export const getNewsEvents = async (token) => {
  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch news events");
  return response.json();
};

export const createNewsEvent = async (data, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  if (!response.ok) throw new Error("Failed to create news event");
  return response.json();
};

export const updateNewsEvent = async (id, data, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  if (!response.ok) throw new Error("Failed to update news event");
  return response.json();
};

export const deleteNewsEvent = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete news event");
  return response.json();
};
