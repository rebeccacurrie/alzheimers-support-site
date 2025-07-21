'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

function parseStructuredResponse(content: string) {
  const stageMatch = content.match(/Stage:([\s\S]*?)(Recommended Activities:|$)/i);
  const activitiesMatch = content.match(/Recommended Activities:([\s\S]*?)(Caregiver Advice:|$)/i);
  const adviceMatch = content.match(/Caregiver Advice:([\s\S]*)/i);

  return {
    stage: stageMatch ? stageMatch[1].trim() : '',
    activities: activitiesMatch ? activitiesMatch[1].trim() : '',
    advice: adviceMatch ? adviceMatch[1].trim() : '',
  };
}

export default function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Only show the latest AI response
  const lastAIMessage = [...messages].reverse().find((m) => m.role === 'assistant');
  const parsed = lastAIMessage ? parseStructuredResponse(lastAIMessage.content) : null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lastAIMessage]);

  return (
    <div className="max-w-2xl w-full mx-auto p-4">
      <label className="block text-lg font-medium mb-2" htmlFor="symptoms-input">
        Describe symptoms
      </label>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          id="symptoms-input"
          className="border p-3 rounded min-h-[80px] resize-y text-base"
          value={input}
          onChange={handleInputChange}
          placeholder="Describe the symptoms your loved one is having..."
          rows={3}
        />
        <button
          type="submit"
          className="self-end px-6 py-2 bg-blue-600 text-white rounded font-semibold disabled:opacity-60"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? 'Loading...' : 'Get Advice'}
        </button>
      </form>

      <div ref={bottomRef} />

      {/* Debug: Show raw AI response */}
      {lastAIMessage && (
        <div className="mt-4 p-2 text-xs text-gray-500 bg-gray-100 rounded">
          <strong>Raw AI response:</strong>
          <pre className="whitespace-pre-wrap">{lastAIMessage.content}</pre>
        </div>
      )}

      {parsed && (
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {/* Stage & Explanation */}
          <div className="flex-1 bg-purple-100 dark:bg-purple-900 p-4 rounded shadow min-w-[220px]">
            <h2 className="font-bold text-purple-800 dark:text-purple-200 mb-1 text-lg">Stage & Explanation</h2>
            <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line text-base">{parsed.stage}</div>
          </div>
          {/* Activities */}
          <div className="flex-1 bg-blue-100 dark:bg-blue-900 p-4 rounded shadow min-w-[220px]">
            <h2 className="font-bold text-blue-800 dark:text-blue-200 mb-1 text-lg">Activities to Slow Deterioration</h2>
            <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line text-base">{parsed.activities}</div>
          </div>
          {/* Caregiver Advice */}
          <div className="flex-1 bg-green-100 dark:bg-green-900 p-4 rounded shadow min-w-[220px]">
            <h2 className="font-bold text-green-800 dark:text-green-200 mb-1 text-lg">Advice for Caregiver</h2>
            <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line text-base">{parsed.advice}</div>
          </div>
        </div>
      )}
    </div>
  );
} 