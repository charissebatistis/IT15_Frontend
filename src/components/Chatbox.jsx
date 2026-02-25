import React, { useMemo, useRef, useState } from 'react';

const getBotReply = (text) => {
  const message = text.toLowerCase();

  if (message.includes('program')) {
    return 'You can open Program Offerings to browse program codes, status, and details.';
  }

  if (message.includes('subject')) {
    return 'Use Subject Offerings to filter by units, semester, and prerequisites.';
  }

  if (message.includes('prerequisite') || message.includes('pre-requisite')) {
    return 'In Subject Offerings, set the filter to "With pre-requisites" to find them fast.';
  }

  if (message.includes('hello') || message.includes('hi')) {
    return 'Hi. Ask me about programs, subjects, or how to use this system.';
  }

  if (message.includes('help')) {
    return 'Try: "show active programs", "how to check prerequisites", or "what can I do here?".';
  }

  return 'I can help with navigation: dashboard, program offerings, subject offerings, and filters.';
};

const Chatbox = ({ compact = false }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome. I am your assistant for this portal.' },
  ]);
  const [isReplying, setIsReplying] = useState(false);
  const endRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isReplying, [input, isReplying]);

  const scrollToEnd = () => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleSend = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isReplying) {
      return;
    }

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setInput('');
    setIsReplying(true);
    scrollToEnd();

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: getBotReply(trimmed) }]);
      setIsReplying(false);
      scrollToEnd();
    }, 450);
  };

  return (
    <section className={`widget-shell chatbox-module ${compact ? 'compact' : ''}`}>
      <div className="module-head">
        <h2>Chatbox</h2>
        <p>Quick assistant for navigation and academic portal usage.</p>
      </div>

      <div className="chatbox-window">
        {messages.map((message, index) => (
          <div
            key={`${message.sender}-${index}`}
            className={message.sender === 'user' ? 'chat-bubble user' : 'chat-bubble bot'}
          >
            {message.text}
          </div>
        ))}
        {isReplying && <div className="chat-bubble bot typing">Typing...</div>}
        <div ref={endRef}></div>
      </div>

      <form className="chatbox-form" onSubmit={handleSend}>
        <input
          className="chatbox-input"
          placeholder="Type your message..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit" className="chatbox-send" disabled={!canSend}>
          Send
        </button>
      </form>
    </section>
  );
};

export default Chatbox;
