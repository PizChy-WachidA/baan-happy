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
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      replyToken,
      messages: [
        {
          type: "text",
          text: `หนูพิมพ์ว่า: ${text} 🐶`
        }
      ]
    })
  });
}
