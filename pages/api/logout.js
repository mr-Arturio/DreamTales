import { serialize } from "cookie";

export default async function logout(req, res) {
  if (req.method === "POST") {
    try {
      const emptyCookie = serialize("Cookie", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      });

      res.setHeader("Set-Cookie", emptyCookie);
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Error during logout" });
    }
  }
}
