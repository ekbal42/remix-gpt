import { useState } from "react";

export default function Chat() {
  const [selectedModel, setSelectedModel] = useState("gpt-3.5");
  const [activeChat, setActiveChat] = useState(1);

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
    if (input.trim() === "") return;

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
      <div className="w-1/4 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Conversations
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
          className="bg-blue-600 p-3 text-center w-full hover:bg-blue-500"
          onClick={() =>
            setChats((prev) => [
              ...prev,
              { id: prev.length + 1, name: `Chat ${prev.length + 1}` },
            ])
          }
        >
          + New Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col justify-between bg-gray-100">
        {/* Model Selector */}
        <div className="p-4 border-b border-gray-300 bg-white">
          <label htmlFor="model-select" className="mr-2 font-semibold">
            Select GPT Model:
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="gpt-3.5">GPT-3.5</option>
            <option value="gpt-4">GPT-4</option>
          </select>
        </div>

        <div className="p-4 overflow-auto flex-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${
                msg.role === "user"
                  ? "text-right text-blue-600"
                  : "text-left text-gray-800"
              } mb-4`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-100" : "bg-gray-200"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <form
          className="p-4 flex items-center space-x-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
