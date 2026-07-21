import { verifyJwt } from "../utils/token.js";

const auth = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    const cookie = req.headers.cookie;

    if (!cookie)
      return res.status(401).json({ message: "User not authenticated." });

     token = cookie.split("=")[1];
  }

  if (!token)
    return res.status(401).json({ message: "User not authenticated." });

  try {
    const data = await verifyJwt(token);

    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token." });
  }
};

export default auth;
