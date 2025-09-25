import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "member" },
  tenantId: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
