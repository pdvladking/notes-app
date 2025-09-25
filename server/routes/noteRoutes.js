import Tenant from "../models/Tenant.js";

router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;

  try {
    const tenant = await Tenant.findOne({ slug: user.tenantId });
    const noteCount = await Note.countDocuments({ tenantId: user.tenantId });

    if (tenant.plan === "free" && noteCount >= 3) {
      return res
        .status(403)
        .json({ message: "Note limit reached. Upgrade to Pro." });
    }

    const note = new Note({
      title,
      content,
      userId: user.id,
      tenantId: user.tenantId,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
});
