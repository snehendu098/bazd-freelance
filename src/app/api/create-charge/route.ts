export async function POST(req: Request, res: Response) {
  const { amount, to } = await req.json();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CC-Api-Key": process.env.CB_API_KEY!,
    },
    body: JSON.stringify({
      local_price: { amount: amount.toString(), currency: "ETH" },
      pricing_type: "fixed_price",
      metadata: {
        amount,
        to,
      },
    }),
  };

  const response = await fetch(
    "https://api.commerce.coinbase.com/charges",
    options
  );
  const data = await response.json();

  return Response.json(data);
}
