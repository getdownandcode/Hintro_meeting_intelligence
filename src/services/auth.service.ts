import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../middleware/error.middleware";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import { LoginInput, RegisterInput } from "../validators/auth.validator";

function createToken(user: { id: string; email: string }) {
  return jwt.sign({ sub: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function register(data: RegisterInput) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new AppError("EMAIL_ALREADY_EXISTS", "An account with this email already exists", 409);
  }

  const password = await bcrypt.hash(data.password, 12);
  const user = await createUser({ email: data.email, password });

  return {
    user: { id: user.id, email: user.email },
    token: createToken(user),
  };
}

export async function login(data: LoginInput) {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new AppError("INVALID_CREDENTIALS", "Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("INVALID_CREDENTIALS", "Invalid email or password", 401);
  }

  return {
    user: { id: user.id, email: user.email },
    token: createToken(user),
  };
}
