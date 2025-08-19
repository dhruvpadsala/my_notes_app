const BASE_URL = "http://localhost:5000/";

async function request<T>(
  method: "GET" | "POST",
  endpoint: string,
  body?: object,
  customHeaders: Record<string, string> = {}
) {
  try {
    let options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    console.log("Api call options & url ===> ", endpoint, options);
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    console.log("response", response);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status} - ${errorText}`);
    }
    const responseData = await response.json().catch(() => null);

    console.log("data.json===", responseData);
    return { success: true, responseData };
  } catch (error: any) {
    console.error("API Error:", error);
    return { success: false, error: error?.message || "Unknown error" };
  }
}

export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>("GET", endpoint, undefined, headers),
  post: <T>(endpoint: string, body: object, headers?: Record<string, string>) =>
    request<T>("POST", endpoint, body, headers),
};
