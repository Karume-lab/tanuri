import ky from "ky";

const AUTH_API_PREFIX_URL = `${process.env.EXPO_PUBLIC_BASE_API_URL}/auth/`;

const baseApi = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_BASE_API_URL,
  timeout: false,
  retry: {
    limit: 5,
  },
});

export const publicApi = baseApi.extend({});

export const authApi = baseApi.extend({
  prefixUrl: AUTH_API_PREFIX_URL,
});

export const protectedApi = (jwt: string) => {
  return baseApi.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Authorization", `Bearer ${jwt}`);
        },
      ],
    },
  });
};

export const serverApi = {
  async post(url: string, options: { json: unknown }) {
    const response = await fetch(`${AUTH_API_PREFIX_URL}${url}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.json),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return {
      async json<T>() {
        return (await response.json()) as T;
      },
    };
  },

  async get(url: string, options?: { token?: string }) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options?.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    const response = await fetch(`${AUTH_API_PREFIX_URL}${url}/`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      console.error(await response.json());
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return {
      async json<T>() {
        return (await response.json()) as T;
      },
    };
  },
};
