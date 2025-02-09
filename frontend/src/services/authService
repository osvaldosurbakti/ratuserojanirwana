export const loginService = async (formData) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login gagal!");
    }

    return data; // Berisi { token, role }
  } catch (error) {
    throw new Error(error.message || "Terjadi kesalahan, coba lagi nanti.");
  }
};
