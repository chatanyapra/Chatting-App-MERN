import useGetMessages from "../hooks/useGetMessages";
import MessageTextSmall from "./MessageTextSmall";

interface MessageType {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
}

function MessageText() {
  const { loading, messages } = useGetMessages();

  return (
    <div>
      <div className="space-y-4 w-full">
        {loading ? (
          <svg className="svg_loading m-auto" viewBox="25 25 50 50">
            <circle className="svg_circle" r="20" cy="50" cx="50"></circle>
          </svg>
        ) : (
          ""
        )}
        {!loading && messages && messages.length === 0 && (
          <p className="text-center text-gray-500">Send a message to start the conversation</p>
        )}
        {!loading && messages && messages.length > 0 && (
          messages.map((message: MessageType) => (
            <MessageTextSmall key={message._id} message={message} />
          ))
        )}
      </div>
    </div>
  );
}

export default MessageText;
