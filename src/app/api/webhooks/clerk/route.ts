import { db } from "~/server/db";

interface WebhookBody {
  data: {
    id: string;
    email_addresses: {
      email_address: string;
    }[];
    first_name: string;
    last_name: string;
    image_url: string;
  };
}

export const POST = async (req: Request) => {
  const { data } = (await req.json()) as WebhookBody;
  console.log("clerk webhook recieved: ", data);

  const emailAddress = data?.email_addresses[0]?.email_address ?? "";
  const firstName = data?.first_name;
  const lastName = data?.last_name;
  const imageUrl = data?.image_url;
  const id = data?.id;

  await db.user.create({
    data: {
      emailAddress: emailAddress,
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl,
      id: id,
    },
  });

  return new Response("Webhook received", { status: 200 });
};
