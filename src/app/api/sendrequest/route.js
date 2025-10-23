import connectToDB from "@/configs/db";
import SendRequestModel from "@/models/SendRequest";
export async function POST(req) {
  connectToDB();
  const reqbody = await req.json();
  const { name, email, phone, body, nameOffice } = reqbody;
  // validation

  const res = await SendRequestModel.create({
    name,
    email,
    phone,
    body,
    nameOffice,
  });
  return Response.json(
    { message: "sendrequest created  to  successfully :))", data: res },
    { status: 201 }
);
  
}
