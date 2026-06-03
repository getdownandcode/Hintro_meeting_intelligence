import { randomUUID } from "crypto";

export function generateTraceId() {
  return randomUUID();
}
