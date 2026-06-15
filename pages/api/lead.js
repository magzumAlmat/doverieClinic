// Lead intake → Telegram. Креды берутся из env (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID),
// заданных в .env.local (локально) и в окружении на сервере. Секреты в репозиторий не коммитятся.

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, phone, message = "", source = "site", details = "" } = req.body || {};

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ ok: false, error: "Invalid name" });
  }
  if (!phone || String(phone).replace(/\D/g, "").length < 10) {
    return res.status(400).json({ ok: false, error: "Invalid phone" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    // eslint-disable-next-line no-console
    console.error("[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы в окружении");
    return res.status(500).json({ ok: false, error: "Server not configured" });
  }

  let text = `🌐 <b>Новая заявка с сайта doverie-clinic.kz</b>\n\n`;
  text += `👤 <b>Имя:</b> ${esc(name)}\n`;
  text += `📞 <b>Телефон:</b> <code>${esc(phone)}</code>\n`;
  text += `🏷️ <b>Форма:</b> <code>${esc(source)}</code>\n`;
  if (message) text += `\n📝 <b>Сообщение:</b>\n${esc(message)}\n`;
  if (details) text += `\n📋 <b>Детали:</b>\n${esc(details)}\n`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    if (!tg.ok) {
      const errText = await tg.text();
      // eslint-disable-next-line no-console
      console.error("[lead] Telegram API error:", errText);
      return res.status(502).json({ ok: false, error: "Telegram error" });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[lead] error:", error);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
}
