// utils/authUtils.js
import auth from "@/config/auth";
import jwt from "jsonwebtoken";

export function checkUserRole() {
  const token = localStorage.getItem(auth.storageTokenKeyName);
  if (token) {
    const decodedToken = jwt.decode(token) as { role: { role: string } } | null;
    return decodedToken?.role.role || "guest";
  } else {
    return "guest";
  }
}


