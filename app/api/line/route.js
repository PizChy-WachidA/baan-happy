export async function POST(req) {
  const body = await req.json();

  console.log("LINE webhook:", JSON.stringify(body));

  return new Response("OK");
}
