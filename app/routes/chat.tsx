import { useNavigate } from "@remix-run/react";
import { useState } from "react";

export default function Chat() {
  const [selectedModel, setSelectedModel] = useState("gpt-3.5");
  const [activeChat, setActiveChat] = useState(1);
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { role: "user", content: "Hello!" },
    { role: "assistant", content: "Hi there! How can I assist you?" },
  ]);
  const [chats, setChats] = useState([
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Please enter a message");
      return;
    }

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);

    // Mocked API response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `This is a mocked response from ${selectedModel}.`,
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className=" w-0 lg:w-1/4 bg-gray-800 text-white flex flex-col">
        <div className="p-4 flex justify-between text-xl font-normal border-b border-gray-700">
          Conversations
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-file-pen-line cursor-pointer"
            onClick={() =>
              setChats((prev) => [
                ...prev,
                { id: prev.length + 1, name: `Chat ${prev.length + 1}` },
              ])
            }
          >
            <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
            <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
            <path d="M8 18h1" />
          </svg>
        </div>
        <div className="flex-1 overflow-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`block w-full text-left p-3 ${
                activeChat === chat.id
                  ? "bg-gray-700"
                  : "hover:bg-gray-700 transition"
              }`}
            >
              {chat.name}
            </button>
          ))}
        </div>
        <button
          className="bg-blue-600 flex gap-2 justify-center p-3 text-center w-full hover:bg-blue-500"
          onClick={() =>
            setChats((prev) => [
              ...prev,
              { id: prev.length + 1, name: `Chat ${prev.length + 1}` },
            ])
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>{" "}
          New Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="w-full lg:w-3/4 flex flex-col justify-between bg-gray-100">
        <div className="border-b border-gray-300 bg-white flex justify-between p-4">
          {/* Model Selector */}
          <div className="flex items-center">
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 outline-none rounded appearance-none"
            >
              <option value="gpt-3.5">GPT-3.5</option>
              <option value="gpt-4">GPT-4</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevrons-up-down h-4 text-gray-500"
            >
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          </div>
          <button
            className="flex gap-2 bg-gray-300 text-white px 
            rounded-full px-2 py-2 shadow
          hover:bg-blue-500 transition"
            onClick={() => navigate("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-power"
            >
              <path d="M12 2v10" />
              <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-auto flex-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${
                msg.role === "user"
                  ? "text-right text-gray-800"
                  : "text-left text-gray-800"
              } mb-4`}
            >
              <div
                className={`inline-block ${
                  msg.role === "user"
                    ? "bg-gray-200  p-4 px-6 rounded-full "
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {msg.role !== "user" && (
                    <div className="border w-12 h-12 flex justify-center items-center bg-white p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-bot mb-0.5 text-gray-500"
                      >
                        <path d="M12 8V4H8" />
                        <rect width="16" height="12" x="4" y="8" rx="2" />
                        <path d="M2 14h2" />
                        <path d="M20 14h2" />
                        <path d="M15 13v2" />
                        <path d="M9 13v2" />
                      </svg>
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form
          className="p-4 flex items-center space-x-2 bg-gray-200 mx-4  lg:mx-12 mb-4 rounded-full"
          onSubmit={handleSubmit}
        >
          <button
            type="submit"
            className="bg-gray-200 text-gray-500 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-paperclip"
            >
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 outline-none bg-gray-200 w-32 lg:w-full"
          />
          <button
            type="submit"
            className="bg-gray-300 text-white p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
