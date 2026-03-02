import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const TEAM_ID = process.env.APPLE_TEAM_ID;
  const KEY_ID = process.env.APPLE_KEY_ID;
  const PRIVATE_KEY = (process.env.APPLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!TEAM_ID || !KEY_ID || !PRIVATE_KEY) {
    return res.status(500).json({
      error: "Missing env vars"
    });
  }

  const now = Math.floor(Date.now() / 1000);

  const token = jwt.sign(
    {
      iss: TEAM_ID,
      iat: now,
      exp: now + 60 * 30
    },
    PRIVATE_KEY,
    {
      algorithm: "ES256",
      keyid: KEY_ID
    }
  );

  res.status(200).json({ token });
}
