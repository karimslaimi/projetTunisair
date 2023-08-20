const host = "http://localhost";
export const BASE_URL = `${host}:3000`;
export const APP_URL = `${host}:4200`;
export const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        "Access-Control-Allow-Origin": "localhost:8081"
    }
};
