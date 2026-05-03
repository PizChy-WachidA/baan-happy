export async function POST(req) {
  const body = await req.json();
  const events = body.events;

  for (const event of events) {
    if (event.type === "message") {
      const userMessage = event.message.text;
      await replyMessage(event.replyToken, userMessage);
    }
  }

  return new Response("OK");
}

async function replyMessage(replyToken, text) {
  let message;

  if (text.includes("จอง")) {
    message = {
      type: "text",
      text: "เลือกประเภทการฝากน้องหมาได้เลยค่ะ 🐶",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "message",
              label: "🏠 ไป-กลับ (250 บาท)",
              text: "ไป-กลับ"
            }
          },
          {
            type: "action",
            action: {
              type: "message",
              label: "🌙 ค้างคืน (600 บาท)",
              text: "ค้างคืน"
            }
          }
        ]
      }
    };
  } else {
    message = {
      type: "text",
      text: `หนูพิมพ์ว่า: ${text} 🐶`
    };
  }

  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      replyToken,
      messages: [message]
    })
  });
}
