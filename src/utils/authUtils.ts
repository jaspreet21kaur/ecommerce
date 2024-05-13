// utils/authUtils.js
import jwt from "jsonwebtoken";

export function checkUserRole() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt.decode(token) as { role: { role: string } } | null;
    return decodedToken?.role.role || "guest";
  } else {
    return "guest";
  }
}


