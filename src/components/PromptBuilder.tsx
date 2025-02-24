// components/PromptBuilder.js
"use client"; // Ensure this runs on the client side in Next.js

import React, { useState } from "react";

const PromptBuilder = () => {
  // State for form inputs
  const [taskInstructions, setTaskInstructions] = useState("");
  const [context, setContext] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [toneStyle, setToneStyle] = useState("");
  const [examples, setExamples] = useState("");
  const [constraints, setConstraints] = useState("");
  // State for error and generated prompt
  const [error, setError] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskInstructions.trim()) {
      setError(
        "Please provide task instructions. This is essential for the AI to understand what you want it to do."
      );
      return;
    }
    setError("");

    // Build the prompt dynamically based on filled sections
    let prompt = "";
    if (context.trim()) {
      prompt += `${context.trim()}\n\n`;
    }
    prompt += taskInstructions.trim();
    if (outputFormat.trim()) {
      prompt += `\n\nPlease provide the output in the following format: ${outputFormat.trim()}`;
    }
    if (toneStyle.trim()) {
      prompt += `\n\nUse a ${toneStyle.trim()} tone.`;
    }
    if (examples.trim()) {
      prompt += `\n\nHere are some examples: ${examples.trim()}`;
    }
    if (constraints.trim()) {
      prompt += `\n\nAdditionally, please adhere to these constraints: ${constraints.trim()}`;
    }
    setGeneratedPrompt(prompt);
  };

  // Calculate character count
  const characterCount = generatedPrompt.length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Prompt Builder</h1>
      <p className="mb-6 text-gray-600">
        Use this tool to create effective AI prompts. Fill in the sections below
        to build a well-structured prompt tailored to your needs.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Instructions (Required) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Instructions (required)
          </label>
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={taskInstructions}
            onChange={(e) => setTaskInstructions(e.target.value)}
            placeholder="What do you want the AI to do?"
          />
          <p className="text-sm text-gray-500 mt-1">
            Be clear and specific. For example, "Write a summary of the given
            article."
          </p>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Context/Background (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Context/Background (optional)
          </label>
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Provide any necessary background information."
          />
          <p className="text-sm text-gray-500 mt-1">
            Include details the AI needs to understand the task, like specific
            data or scenarios.
          </p>
        </div>

        {/* Desired Output Format (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desired Output Format (optional)
          </label>
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            placeholder="How should the output be structured?"
          />
          <p className="text-sm text-gray-500 mt-1">
            Specify the format, such as a list, paragraph, code, etc. For
            example, "Provide the answer as a bullet-point list."
          </p>
        </div>

        {/* Tone and Style (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tone and Style (optional)
          </label>
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            value={toneStyle}
            onChange={(e) => setToneStyle(e.target.value)}
            placeholder="What tone or style should the response have?"
          />
          <p className="text-sm text-gray-500 mt-1">
            Indicate the desired tone, such as formal, casual, technical, etc.
            For example, "Use a professional and concise tone."
          </p>
        </div>

        {/* Examples (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Examples (optional)
          </label>
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={examples}
            onChange={(e) => setExamples(e.target.value)}
            placeholder="Provide examples of the desired output."
          />
          <p className="text-sm text-gray-500 mt-1">
            Showing examples can guide the AI toward the expected result. For
            instance, "Example: - Item 1 - Item 2"
          </p>
        </div>

        {/* Constraints (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Constraints (optional)
          </label>
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="Are there any specific requirements or limitations?"
          />
          <p className="text-sm text-gray-500 mt-1">
            Mention any constraints, such as word limits or things to avoid. For
            example, "Do not use technical jargon."
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Generate Prompt
        </button>
      </form>

      {/* Generated Prompt Section */}
      {generatedPrompt && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Generated Prompt</h2>
          <textarea
            className="w-full p-3 border rounded-md bg-gray-100 resize-none"
            rows={10}
            value={generatedPrompt}
            readOnly
          />
          <p className="mt-2 text-gray-700">
            <strong>Character Count:</strong> {characterCount}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            <strong>Context Length Limits:</strong>
            <br />
            - GPT-3: ~2048 tokens (~8192 characters)
            <br />
            - GPT-4: ~8192 tokens (~32768 characters)
            <br />
            <em>Note: These are approximations. Actual token count may vary.</em>
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(generatedPrompt)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptBuilder;