'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

function parseStructuredResponse(content: string) {
  // Remove the 's' flag and use [\s\S]*? for multiline matching
  const stageMatch = content.match(/Stage:([\s\S]*?)(Recommended Activities:|$)/i);
  const activitiesMatch = content.match(/Recommended Activities:([\s\S]*?)(Caregiver Advice:|$)/i);
  const adviceMatch = content.match(/Caregiver Advice:([\s\S]*)/i);

  return {
    stage: stageMatch ? stageMatch[1].trim() : '',
    activities: activitiesMatch ? activitiesMatch[1].trim() : '',
    advice: adviceMatch ? adviceMatch[1].trim() : '',
  };
}

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Alzheimer's Support Chatbot</h1>
      <div className="space-y-4 max-h-[500px] overflow-y-auto border p-4 rounded bg-white dark:bg-gray-900">
        {messages.map((m, i) => {
          if (m.role === 'user') {
            return (
              <div key={i} className="text-blue-600">
                <strong>You:</strong> {m.content}
              </div>
            );
          } else {
            // AI response: parse and display in cards
            const { stage, activities, advice } = parseStructuredResponse(m.content);
            if (stage || activities || advice) {
              return (
                <div key={i} className="flex flex-col gap-4">
                  {stage && (
                    <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded shadow">
                      <h2 className="font-bold text-purple-800 dark:text-purple-200 mb-1">Stage</h2>
                      <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">{stage}</div>
                    </div>
                  )}
                  {activities && (
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded shadow">
                      <h2 className="font-bold text-blue-800 dark:text-blue-200 mb-1">Recommended Activities</h2>
                      <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">{activities}</div>
                    </div>
                  )}
                  {advice && (
                    <div className="bg-green-100 dark:bg-green-900 p-4 rounded shadow">
                      <h2 className="font-bold text-green-800 dark:text-green-200 mb-1">Caregiver Advice</h2>
                      <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">{advice}</div>
                    </div>
                  )}
                </div>
              );
            }
            // fallback: show as plain text
            return (
              <div key={i} className="text-green-700">
                <strong>AI:</strong> {m.content}
              </div>
            );
          }
        })}
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