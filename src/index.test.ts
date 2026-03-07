import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./index";

describe("API", () => {
  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /api/v1/status returns version", async () => {
    const res = await request(app).get("/api/v1/status");
    expect(res.status).toBe(200);
    expect(res.body.version).toBe("0.1.0");
  });
});
