import { StatusCodes } from "http-status-codes";
import admin from "~/config/firebase";

export const handleVerifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // const decodedToken = jwt.verify(token, ENVS.PRIVATE_KEY_JWT);
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Invalid or expired token" });
  }
};
