import { useState, useEffect } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [userId] = useState(Math.random().toString(36).substr(2, 9));
  const [userName, setUserName] = useState("");
  const [isUserSet, setIsUserSet] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");
    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "" && socket) {
      const messageData = { userId, userName, text: input };
      socket.send(JSON.stringify(messageData));
      setMessages((prev) => [...prev, messageData]);
      setInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      {!isUserSet ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-lg font-bold mb-4">Enter Your Name</h2>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
            onClick={() => setIsUserSet(userName.trim() !== "")}
          >
            Join Chat
          </button>
        </div>
      ) : (
        <div className="flex flex-col flex-1 bg-white p-4 shadow-lg max-w-2xl mx-auto w-full">
          <h2 className="text-xl font-bold text-center mb-4">Group Chat</h2>
          <div className="flex-1 overflow-auto mb-4 p-2 bg-gray-50 rounded-md h-96">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded-md max-w-xs ${msg.userId === userId ? "bg-green-500 text-white self-end" : "bg-blue-500 text-white self-start"}`}
              >
                <strong>{msg.userId === userId ? "You" : msg.userName}:</strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex items-center border-t p-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
