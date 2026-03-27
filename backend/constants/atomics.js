export const cookieSettings = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "prod",
  sameSite: "Strict",
  path: "/",
};
