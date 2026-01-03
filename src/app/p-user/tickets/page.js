import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/ServerHelpers";
import { redirect } from "next/navigation";

const page = async () => {
  await connectToDB();
  const user = await authUser();

  if (!user) {
    return redirect("/login-register");
  }

  const tickets = await TicketModel.find({ user: user._id, isAnswer: false })
    .populate("department", "title")
    .sort({ _id: -1 })
    .lean();

  return (
    <Layout>
      <main style={{ padding: "20px" }}>
         <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
      </main>
    </Layout>
  );
};

export default page;