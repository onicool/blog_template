import React from 'react';
import ClipboardJS from 'clipboard';

const CodeBlock = ({ children, language }) => {
  const newClipboard = new ClipboardJS('.btn');

  return (
    <pre className={`language-${language}`}>
      <code>{children}</code>
      <button className="btn">コピー</button>
    </pre>
  );
};