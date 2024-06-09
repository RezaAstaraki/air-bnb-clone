import Link from "next/link";
import Conversation from "../components/inbox/Conversation";
import { getConversations } from "../libs/actions/actions";

const InboxPage = async () => {
  const data = await getConversations();
  console.log(data);
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
      <h1 className="my-6 text-2xl">Inbox</h1>
      {data.map((conversation: any) => {
        return (
          <Conversation
            key={conversation.id}
            id={conversation.id}
            user={conversation.users[1]}
            modified={conversation.created_at}
          />
        );
      })}
    </main>
  );
};

export default InboxPage;
