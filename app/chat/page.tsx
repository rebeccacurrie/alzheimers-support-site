'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Alzheimer's Support Chatbot</h1>
      <div className="space-y-4 max-h-[500px] overflow-y-auto border p-4 rounded">
        {messages.map((m, i) => (
          <div key={i} className={`${m.role === 'user' ? 'text-blue-600' : 'text-green-700'}`}>
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          className="border flex-grow p-2 rounded"
          value={input}
          onChange={handleInputChange}
          placeholder="Describe the symptoms your loved one is having..."
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
} 