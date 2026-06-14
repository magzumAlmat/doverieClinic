// Lead intake endpoint. For now it just validates and logs the lead.
// In production, forward to CRM / Telegram / email here.
export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, phone, message = "", source = "site" } = req.body || {};

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ ok: false, error: "Invalid name" });
  }
  if (!phone || String(phone).replace(/\D/g, "").length < 10) {
    return res.status(400).json({ ok: false, error: "Invalid phone" });
  }

  // eslint-disable-next-line no-console
  console.log("[lead]", { name, phone, message, source, at: new Date().toISOString() });

  return res.status(200).json({ ok: true });
}
