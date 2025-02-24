import { useState, useEffect } from 'react';
import { createHighlighter, Highlighter } from 'shiki';

type Props = {
  code: string;
  lang: string;
  theme?: string;
  showLineNumbers?: boolean;
  className?: string;
};

let highlighter: Highlighter | null = null;

const CodeBlock = ({ code, lang, theme = 'nord', className }: Props) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  useEffect(() => {
    const highlight = async () => {
      try {
        if (!highlighter) {
          highlighter = await createHighlighter({
            themes: ['nord'],
            langs: ['typescript'],
          });
        }

        const hl = highlighter;

        if (theme && !hl.getLoadedThemes().includes(theme)) {
          await hl.loadTheme(theme);
        }

        if (lang && !hl.getLoadedLanguages().includes(lang)) {
          await hl.loadLanguage(lang);
        }

        const html = hl.codeToHtml(code, {
          lang,
          theme,
        });

        setHighlightedCode(html);
      } catch (error) {
        console.error('Error highlighting code:', error);
        setHighlightedCode(code);
      }
    };

    highlight();
  }, [code, lang, theme]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default CodeBlock;