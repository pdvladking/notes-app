import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";
import bcrypt from "bcrypt";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const tenants = [
  { name: "Acme", slug: "acme", plan: "free" },
  { name: "Globex", slug: "globex", plan: "free" },
];

const users = [
  { email: "admin@acme.test", role: "admin", tenantId: "acme" },
  { email: "user@acme.test", role: "member", tenantId: "acme" },
  { email: "admin@globex.test", role: "admin", tenantId: "globex" },
  { email: "user@globex.test", role: "member", tenantId: "globex" },
];

const passwordHash = await bcrypt.hash("password", 10);

await Tenant.deleteMany({});
await User.deleteMany({});
await Tenant.insertMany(tenants);

for (const user of users) {
  await User.create({ ...user, password: passwordHash });
}

console.log("✅ Seeded test accounts");
process.exit();
