import React, { useState, useEffect } from 'react';
import { loadHighlighter, Highlighter } from 'shiki';
import DOMPurify from 'dompurify';

interface CodeBlockProps {
  lang: string;
  code: string | File;
  theme?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ lang, code, theme = 'nord' }) => {
  const [html, setHtml] = useState<string>('');
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  // Load the Shiki highlighter when the component mounts or theme changes.
  useEffect(() => {
    loadHighlighter({ theme }).then((hl) => setHighlighter(hl));
  }, [theme]);

  useEffect(() => {
    if (!highlighter) return;

    const processCode = (codeStr: string) => {
      // Convert code to highlighted HTML using Shiki.
      const highlightedHtml = highlighter.codeToHtml(codeStr, { lang });
      // Sanitize HTML output to prevent XSS.
      const cleanHtml = DOMPurify.sanitize(highlightedHtml);
      setHtml(cleanHtml);
    };

    if (code instanceof File) {
      // If 'code' is a File, read it as text.
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        processCode(fileContent);
      };
      reader.readAsText(code);
    } else if (typeof code === 'string') {
      processCode(code);
    }
  }, [code, highlighter, lang]);

  return (
    <div
      className="code-block p-4 rounded-md bg-gray-900 overflow-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CodeBlock;
