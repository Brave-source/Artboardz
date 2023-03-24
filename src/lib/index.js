const dev = "http://localhost:4000";
const prod = "https://ec2-35-163-13-192.us-west-2.compute.amazonaws.com";

export const baseURL =
  window.location.hostname.split(":")[0] === "localhost" ||
  window.location.hostname.includes("192")
    ? dev
    : prod;
