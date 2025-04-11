'use client';
import { useState } from 'react';

const Index = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newChat = [...chat, { sender: 'user', text: input }];
    setChat(newChat);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        let errorMessage = `Failed to fetch response from API: ${res.status} ${res.statusText}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          console.warn('Could not parse error response as JSON:', jsonError);
        }
        console.error('Fetch failed:', { status: res.status, statusText: res.statusText, errorMessage });
        throw new Error(errorMessage);
      }

      const data = await res.json();
      setChat([...newChat, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error('SendMessage Error:', error.message);
      setChat([...newChat, { sender: 'bot', text: error.message || 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-3xl p-6 mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl">
        <h1 className="mb-4 text-3xl font-bold text-blue-700">🎓 EduBot - Your Study Buddy</h1>
        <div className="h-auto max-h-[400px] overflow-y-auto space-y-4 mb-4 border p-4 rounded-lg">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100'
              }`}
            >
              <p className="text-gray-800">{msg.text}</p>
            </div>
          ))}
          {loading && <p className="italic text-gray-500">Typing...</p>}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask about courses, colleges, or fees..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;