import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { MdOutlineClose } from "react-icons/md";
import Image from 'next/image';
/*
    I created a shell function that added basic blur and gifs, then used AI to fix some of the errors and add in the character removal as it came to mind.
    This introduced new errors due to project context. So I manually adjusted and worked through the individual errors,
    IDE is showing errors that are incorrect due to the data types as it cannot detect that a value would never be null as a future state.
    Manually fixed those errors.
*/
interface DegradePageProps {
  children?: React.ReactNode;
}

const DegradePage: React.FC<DegradePageProps> = ({ children }) => {
  const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // I want to include this as a wrapper that impacts only the children or independently that then impacts the whole page
  const degradeBody = !children;

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const degradationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickCounterRef = useRef(0);
  const blurCounterRef = useRef(0);

  const [isDegrading, setIsDegrading] = useState(false);
  const [pixelationLevel, setPixelationLevel] = useState(0);

  const initialParagraphs =
    React.Children.map(children, (child) =>
      typeof child === 'string' ? child : ''
    ) || [
      "This is fine. Everything is fine.",
      "I do these things to learn new stuffs. Jib obtained.",
      "What's the best way to save your dad jokes? In a dada-base."
    ];
  const [paragraphs, setParagraphs] = useState(initialParagraphs);
  const [gifUrls, setGifUrls] = useState<string[]>([]);

  // I dont want to actually remove the content. Just for fun.
  const originalTextMapRef = useRef<Map<Element, string>>(new Map());
  const gifElementsRef = useRef<HTMLImageElement[]>([]);
  const transitionTime = '120s';

  const getNoticeContainer = useCallback(() => {
    if (!isClient) return null;
    let container = document.getElementById('degrade-experiment-notice-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'degrade-experiment-notice-root';
      document.documentElement.appendChild(container);
    }
    return container;
  }, [isClient]);

  const handleReset = () => {
    setIsDegrading(false);
    if (!degradeBody) {
      // Container
      setParagraphs(initialParagraphs);
      setGifUrls([]);
      setPixelationLevel(0);
    } else if (isClient) {
      // Body
      setPixelationLevel(0);
      document.body.style.filter = 'none';
      document.body.style.transition = '';
      gifElementsRef.current.forEach(img => img.remove());
      gifElementsRef.current = [];
      originalTextMapRef.current.forEach((origText, element) => {
        element.textContent = origText;
      });
      originalTextMapRef.current.clear();
    }
    if (degradationIntervalRef.current) {
      clearInterval(degradationIntervalRef.current);
      degradationIntervalRef.current = null;
    }
    blurCounterRef.current = 0;
    tickCounterRef.current = 0;
    resetTimer();
  };

  const resetTimer = useCallback(() => {
    if (isDegrading) return;
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setIsDegrading(true);
    }, 60000);
  }, [isDegrading]);

  useEffect(() => {
    const events = ['click', 'mousemove', 'touchstart', 'scroll', 'keydown'];
    const handleUserActivity = () => {
      if (!isDegrading) resetTimer();
    };
    events.forEach(event => {
      if (isClient) window.addEventListener(event, handleUserActivity);
    });
    resetTimer();
    return () => {
      events.forEach(event => {
        if (isClient) window.removeEventListener(event, handleUserActivity);
      });
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (degradationIntervalRef.current) clearInterval(degradationIntervalRef.current);
    };
  }, [isDegrading, resetTimer, isClient]);

  useEffect(() => {
    if (isDegrading && !degradationIntervalRef.current && isClient) {
      degradationIntervalRef.current = setInterval(() => {
        tickCounterRef.current += 1;
        if (tickCounterRef.current > 400) {
          clearInterval(degradationIntervalRef.current);
          degradationIntervalRef.current = null;
          return;
        }
        const effect = Math.floor(Math.random() * 3);
        if (effect === 0) {
          // 11->1 seems a good ratio
          if (blurCounterRef.current % 11 === 0) {
            setPixelationLevel(prev => {
              const newLevel = Math.min(prev + 1, 10);
              if (degradeBody) {
                document.body.style.transition = `filter ${transitionTime}`;
                document.body.style.filter = newLevel > 0 ? `blur(${newLevel}px)` : 'none';
              }
              return newLevel;
            });
          }
          blurCounterRef.current += 1;
        } else if (effect === 1) { // Gif Appender
          // Need to make or find more gifs
          const gifs = [
            '/fire1.gif',
            '/fire2.gif',
            '/fire3.gif'
          ];
          const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
          if (!degradeBody) {
            setGifUrls(prev => [...prev, randomGif]);
          } else {
            const img = document.createElement('img');
            img.src = randomGif;
            img.alt = "Everything is fine.";
            img.style.position = 'absolute';
            img.style.width = `${Math.random() * 45 + 10}px`;
            img.style.height = img.style.width;
            img.style.top = `${Math.random() * 95}%`;
            img.style.left = `${Math.random() * 95}%`;
            img.style.pointerEvents = 'none';
            document.body.appendChild(img);
            gifElementsRef.current.push(img);
          }
        } else if (effect === 2) { // Text Stripper
          if (!degradeBody) {
            setParagraphs(prev => {
              const newParagraphs = [...prev];
              const pIndex = Math.floor(Math.random() * newParagraphs.length);
              if (newParagraphs[pIndex].length > 0) {
                const charIndex = Math.floor(Math.random() * newParagraphs[pIndex].length);
                newParagraphs[pIndex] =
                  newParagraphs[pIndex].slice(0, charIndex) +
                  newParagraphs[pIndex].slice(charIndex + 1);
              }
              return newParagraphs;
            });
          } else {
            const pElements = Array.from(document.body.querySelectorAll('p'));
            if (pElements.length > 0) {
              const randIndex = Math.floor(Math.random() * pElements.length);
              const p = pElements[randIndex];
              if (!originalTextMapRef.current.has(p)) {
                originalTextMapRef.current.set(p, p.textContent || '');
              }
              if (p.textContent && p.textContent.length > 0) {
                const charIndex = Math.floor(Math.random() * p.textContent.length);
                p.textContent = p.textContent.slice(0, charIndex) + p.textContent.slice(charIndex + 1);
              }
            }
          }
        }
      }, 1000);
    }
    return () => {
      if (degradationIntervalRef.current) {
        clearInterval(degradationIntervalRef.current);
        degradationIntervalRef.current = null;
      }
    };
  }, [isDegrading, degradeBody, transitionTime, isClient]);

  const containerStyle: React.CSSProperties = {
    filter: !degradeBody && pixelationLevel > 0 ? `blur(${pixelationLevel}px)` : 'none',
    transition: `filter ${transitionTime}`,
    position: 'relative'
  };

  // Unsure if its a Vite thing but for some reason this div acts different with TW classes setting the position alone.
  // TODO_LOW: Check if prod build requires this, address later.
  const noteStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  };

  const noteElement = (
    <div style={noteStyle} onClick={handleReset} className='rounded-full bg-white text-stone-950 text-sm/6 cursor-pointer flex items-center px-4 py-2 shadow-red-500'>
      <MdOutlineClose className="mr-3 rounded-full border-red-800 border-2 text-stone-950 text-base" />
      Enjoy an experiment while you Loiter.
    </div>
  );

  // In body mode, render the note into the dedicated container only after mounting.
  const renderedNote =
    degradeBody && isClient && mounted && getNoticeContainer()
      ? ReactDOM.createPortal(noteElement, getNoticeContainer()!)
      : !degradeBody
      ? noteElement
      : null;

  return (
    <>
      {!degradeBody && (
        <div style={containerStyle}>
          {paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          {gifUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt="Everything is Fine."
              style={{
                position: 'absolute',
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                width: '40px',
                height: '40px',
                pointerEvents: 'none'
              }}
            />
          ))}
        </div>
      )}
      {isDegrading && renderedNote}
    </>
  );
};

export default DegradePage;
