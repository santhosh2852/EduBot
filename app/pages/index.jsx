// 'use client';
// import { useState } from 'react';

// const Index = () => {
//   const [input, setInput] = useState('');
//   const [chat, setChat] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newChat = [...chat, { sender: 'user', text: input }];
//     setChat(newChat);
//     setInput('');
//     setLoading(true);

//     try {
//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!res.ok) {
//         let errorMessage = `Failed to fetch response from API: ${res.status} ${res.statusText}`;
//         try {
//           const errorData = await res.json();
//           errorMessage = errorData.error || errorMessage;
//         } catch (jsonError) {
//           console.warn('Could not parse error response as JSON:', jsonError);
//         }
//         console.error('Fetch failed:', { status: res.status, statusText: res.statusText, errorMessage });
//         throw new Error(errorMessage);
//       }

//       const data = await res.json();
//       setChat([...newChat, { sender: 'bot', text: data.reply }]);
//     } catch (error) {
//       console.error('SendMessage Error:', error.message);
//       setChat([...newChat, { sender: 'bot', text: error.message || 'Sorry, something went wrong. Please try again.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 to-white">
//       <div className="max-w-3xl p-6 mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl">
//         <h1 className="mb-4 text-3xl font-bold text-blue-700">🎓 EduBot - Your Study Buddy</h1>
//         <div className="h-auto max-h-[400px] overflow-y-auto space-y-4 mb-4 border p-4 rounded-lg">
//           {chat.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-3 rounded-lg max-w-[80%] ${
//                 msg.sender === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100'
//               }`}
//             >
//               <p className="text-gray-800">{msg.text}</p>
//             </div>
//           ))}
//           {loading && <p className="italic text-gray-500">Typing...</p>}
//         </div>
//         <div className="flex gap-2">
//           <input
//             className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Ask about courses, colleges, or fees..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;



//deepseek

// 'use client';
// import { useState } from 'react';

// const Index = () => {
//   const [input, setInput] = useState('');
//   const [chat, setChat] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newChat = [...chat, { sender: 'user', text: input }];
//     setChat(newChat);
//     setInput('');
//     setLoading(true);

//     try {
//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!res.ok) {
//         let errorMessage = `Failed to fetch response from API: ${res.status} ${res.statusText}`;
//         try {
//           const errorData = await res.json();
//           if (errorData.error?.includes('insufficient_quota')) {
//             errorMessage = 'DeepSeek API quota exceeded. Please check your account or try again later.';
//           } else if (errorData.error?.includes('invalid_api_key')) {
//             errorMessage = 'Invalid DeepSeek API key. Please check your configuration.';
//           } else {
//             errorMessage = errorData.error || errorMessage;
//           }
//         } catch (jsonError) {
//           console.warn('Could not parse error response as JSON:', jsonError);
//         }
//         console.error('Fetch failed:', { status: res.status, statusText: res.statusText, errorMessage });
//         throw new Error(errorMessage);
//       }

//       const data = await res.json();
//       setChat([...newChat, { sender: 'bot', text: data.reply }]);
//     } catch (error) {
//       console.error('SendMessage Error:', error.message);
//       setChat([...newChat, { sender: 'bot', text: error.message || 'Sorry, something went wrong. Please try again.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 to-white">
//       <div className="max-w-3xl p-6 mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl">
//         <h1 className="mb-4 text-3xl font-bold text-blue-700">🎓 EduBot - Your Study Buddy</h1>
//         <div className="h-auto max-h-[400px] overflow-y-auto space-y-4 mb-4 border p-4 rounded-lg">
//           {chat.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-3 rounded-lg max-w-[80%] ${
//                 msg.sender === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100'
//               }`}
//             >
//               <p className="text-gray-800">{msg.text}</p>
//             </div>
//           ))}
//           {loading && <p className="italic text-gray-500">Typing...</p>}
//         </div>
//         <div className="flex gap-2">
//           <input
//             className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Ask about courses, colleges, or fees..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;


//gemini

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
          if (errorData.error?.code === '429') {
            errorMessage = 'Gemini API quota exceeded. Please try again later or check your plan.';
          } else if (errorData.error?.message?.includes('API key')) {
            errorMessage = 'Invalid Gemini API key. Please check your configuration.';
          } else {
            errorMessage = errorData.error?.message || errorData.error || errorMessage;
          }
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
    <div className="flex items-center justify-center min-h-screen px-2 py-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col h-[90vh] sm:h-[85vh] md:h-[80vh]">
        <h1 className="flex-shrink-0 mb-3 text-xl font-bold text-blue-700 sm:text-2xl md:text-3xl sm:mb-4 md:mb-5">
          🎓 EduBot - Your Study Buddy
        </h1>
        <div className="flex-1 p-3 mb-3 space-y-3 overflow-y-auto border rounded-lg sm:space-y-4 sm:mb-4 sm:p-4 bg-gray-50">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-2 sm:p-3 rounded-lg max-w-[85%] sm:max-w-[80%] md:max-w-[70%] w-fit ${
                msg.sender === 'user'
                  ? 'bg-blue-100 ml-auto text-right'
                  : 'bg-gray-100 text-left'
              }`}
            >
              <p className="text-sm text-gray-800 break-words sm:text-base md:text-lg">{msg.text}</p>
            </div>
          ))}
          {loading && <p className="text-sm italic text-gray-500 sm:text-base">Typing...</p>}
        </div>
        <div className="flex flex-col flex-shrink-0 gap-2 sm:flex-row">
          <input
            className="flex-1 p-2 text-sm border rounded-lg shadow-sm sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base md:text-lg"
            placeholder="Ask about courses, colleges, or fees..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="w-full px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700 sm:text-base md:text-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;