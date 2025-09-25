import express from "express";
import Tenant from "../models/Tenant.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:slug/upgrade", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can upgrade plans" });
  }

  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    tenant.plan = "pro";
    await tenant.save();

    res.json({ message: "Tenant upgraded to Pro plan" });
  } catch (err) {
    res.status(500).json({ message: "Upgrade failed" });
  }
});

export default router;
