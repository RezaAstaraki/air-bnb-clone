import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ConversationProps {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  modified: string;
}

function Conversation({ user, id, modified }: ConversationProps) {
  return (
    <div className="flex justify-between w-full px-6 py-4 border border-gray-300 rounded-xl">
      <div className=" ">
        <p className="mb-6 text-xl">{user.name}</p>
        <Link href={`/inbox/${id}`}>
          <div>
            <p className="text-airbnb hover:text-airbnb-dark  text-xl">
              Go to conversations
            </p>
            <p>{modified}</p>
          </div>
        </Link>
      </div>
      <div className="relative w-[100px] rounded-full">
        <Image
          className="rounded-full "
          alt={user.name}
          fill
          src={`http://127.0.0.1:8000${user.avatar}`}
        />
      </div>
    </div>
  );
}

export default Conversation;
// href={`/inbox/${conversation.id}`}
