import React, { useEffect, useRef, useState } from 'react';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);
  const preRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative group">
      <pre
        ref={preRef}
        className={`language-${language} rounded-lg border border-cyber-primary bg-cyber-dark p-4 overflow-x-auto`}
      >
        <code className="block">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className={`
          absolute top-2 right-2 px-3 py-1 
          text-sm font-cyber rounded-md
          transition-all duration-200
          ${copied 
            ? 'bg-green-600 text-white border-green-500' 
            : 'bg-cyber-dark text-cyber-primary border border-cyber-primary hover:text-cyber-secondary hover:border-cyber-secondary'
          }
          opacity-0 group-hover:opacity-100 focus:opacity-100
        `}
        aria-label="コードをコピー"
      >
        {copied ? 'コピーしました!' : 'コピー'}
      </button>
    </div>
  );
};

export default CodeBlock;