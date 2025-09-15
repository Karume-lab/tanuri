import ky from "ky";

const AUTH_API_PREFIX_URL = `${process.env.EXPO_PUBLIC_BASE_API_URL}/auth/`;

const baseApi = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_BASE_API_URL,
  timeout: 10000,
});

export const publicApi = baseApi.extend({});

export const authApi = baseApi.extend({
  prefixUrl: AUTH_API_PREFIX_URL,
});

const getAuthHeaders = () => {
  const session = {
    access:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2OTA1NDQ2LCJpYXQiOjE3NTY5MDUxNDYsImp0aSI6IjFlMmEyMGQwNjA2ZjQzNzQ4NzVlYTNkNDliZmI2NDlhIiwidXNlcl9pZCI6IjkifQ.2woj_uQFl7c-cr7kH7Qx24uLFLNngpBaggDTTSWWmiY",
  };
  return { Authorization: `Bearer ${session.access}` };
};

export const protectedApi = baseApi.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const headers = getAuthHeaders();
        Object.entries(headers).forEach(([key, value]) => {
          request.headers.set(key, value);
        });
      },
    ],
  },
});

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
