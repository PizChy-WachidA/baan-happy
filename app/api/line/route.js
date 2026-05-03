import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

let userState = {};

export async function POST(req) {
  const body = await req.json();

  for (const event of body.events) {
    if (event.type === "message") {
      const userId = event.source.userId;

      if (event.message.type === "image") {
        await handleImage(event, userId);
      }

      if (event.message.type === "text") {
        await handleText(event.replyToken, userId, event.message.text);
      }
    }
  }

  return new Response("OK");
}

// ---------------- TEXT FLOW ----------------

async function handleText(replyToken, userId, text) {
  let state = userState[userId] || {};
  let msg;

  // MENU
  if (text === "เมนู") {
    msg = quick("เลือกเมนู 🐶", [
      ["🐶 ลงทะเบียน", "ลงทะเบียน"],
      ["📅 จอง", "จอง"]
    ]);
  }

  // ---------------- REGISTER ----------------

  else if (text === "ลงทะเบียน") {
    userState[userId] = { step: "name" };
    msg = txt("ชื่อน้องหมา?");
  }

  else if (state.step === "name") {
    userState[userId] = { ...state, name: text, step: "breed" };
    msg = quick("เลือกพันธุ์", [
      ["ปอม", "ปอม"],
      ["ชิวาวา", "ชิวาวา"],
      ["ชิสุ", "ชิสุ"],
      ["อื่นๆ", "อื่นๆ"]
    ]);
  }

  else if (state.step === "breed") {
    userState[userId] = { ...state, breed: text, step: "weight" };
    msg = txt("น้ำหนัก (กก.)");
  }

  else if (state.step === "weight") {
    userState[userId] = { ...state, weight: text, step: "allergy" };
    msg = txt("แพ้อาหารไหม? (ไม่มี = พิมพ์ ไม่มี)");
  }

  else if (state.step === "allergy") {
    userState[userId] = { ...state, allergies: text, step: "image" };
    msg = txt("ส่งรูปน้อง 🐶📸");
  }

  // ---------------- BOOK ----------------

  else if (text === "จอง") {
    const { data: pets } = await supabase
      .from("pets")
      .select("*")
      .eq("line_user_id", userId);

    if (!pets?.length) {
      msg = txt("ยังไม่มีโปรไฟล์น้อง กรุณาลงทะเบียนก่อน");
    } else {
      userState[userId] = { step: "choose_pets", pets };

      let list = "เลือกน้อง (เช่น 1,2)\n\n";
      pets.forEach((p, i) => {
        list += `${i + 1}. ${p.name} (${p.breed})\n`;
      });

      msg = txt(list);
    }
  }

  else if (state.step === "choose_pets") {
    const ids = text.split(",").map(i => state.pets[i - 1]).filter(Boolean);

    userState[userId] = { step: "type", pets: ids };

    msg = quick("เลือกบริการ", [
      ["ไป-กลับ 250", "ไป-กลับ"],
      ["ค้างคืน 600", "ค้างคืน"]
    ]);
  }

  else if (state.step === "type") {
    userState[userId] = { ...state, type: text, step: "date" };
    msg = txt("พิมพ์วันที่ (10/05/2026)");
  }

  else if (state.step === "date") {
    const amount = state.pets.length;
    const price = state.type === "ค้างคืน" ? 600 : 250;
    const subtotal = price * amount;
    const discount = amount >= 2 ? subtotal * 0.05 : 0;
    const total = subtotal - discount;

    const bookingCode = "BH" + Math.floor(Math.random() * 999999);

    await supabase.from("bookings").insert({
      line_user_id: userId,
      pet_ids: state.pets.map(p => p.id),
      service_type: state.type,
      booking_date: text,
      total,
      booking_code: bookingCode
    });

    userState[userId] = {};

    msg = txt(
`🎉 ขอบคุณที่จองกับบ้านแฮปปี้ 💛

📋 สรุป
🐶 ${amount} ตัว
📅 ${text}
บริการ: ${state.type}

💰 ${subtotal} บาท
${discount ? `ลด 5%: -${discount}\n` : ""}รวม: ${total} บาท

🧾 รหัสเช็คอิน: ${bookingCode}

📌 กรุณานำ:
- อาหารน้อง
- ของเล่น/เบาะ
เพื่อให้น้องไม่เครียดนะคะ 🐶💛

📞 098-742-9552`
    );
  }

  else {
    msg = txt("พิมพ์ เมนู เพื่อเริ่มต้น 💛");
  }

  await reply(replyToken, msg);
}

// ---------------- IMAGE ----------------

async function handleImage(event, userId) {
  const state = userState[userId];
  if (state?.step !== "image") return;

  const res = await fetch(
    `https://api-data.line.me/v2/bot/message/${event.message.id}/content`,
    { headers: { Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}` } }
  );

  const buffer = await res.arrayBuffer();
  const file = `${Date.now()}.jpg`;

  await supabase.storage.from("pets").upload(file, buffer);

  const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/pets/${file}`;

  await supabase.from("pets").insert({
    line_user_id: userId,
    name: state.name,
    breed: state.breed,
    weight: state.weight,
    allergies: state.allergies,
    image_url: url
  });

  userState[userId] = {};

  await push(userId, txt(
`✅ ลงทะเบียนสำเร็จ

💛 สามารถนำ:
- ของเล่น
- เบาะ
- ผ้าห่ม
มาให้น้องได้เลยนะคะ`
  ));
}

// ---------------- VIDEO PUSH (admin use) ----------------

// เรียกผ่าน /api/send-video
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const videoUrl = searchParams.get("video");

  await push(userId, {
    type: "video",
    originalContentUrl: videoUrl,
    previewImageUrl: videoUrl
  });

  return new Response("sent");
}

// ---------------- UTILS ----------------

function txt(text) {
  return { type: "text", text };
}

function quick(text, items) {
  return {
    type: "text",
    text,
    quickReply: {
      items: items.map(i => ({
        type: "action",
        action: { type: "message", label: i[0], text: i[1] }
      }))
    }
  };
}

async function reply(token, msg) {
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ replyToken: token, messages: [msg] })
  });
}

async function push(userId, msg) {
  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ to: userId, messages: [msg] })
  });
}
