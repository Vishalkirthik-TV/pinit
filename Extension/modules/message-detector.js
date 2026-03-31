/**
 * message-detector.js
 * Identifies the AI chat platform and provides selectors for message elements.
 */

window.Pinit = window.Pinit || {};

Pinit.MessageDetector = (() => {
  const configs = {
    chatgpt: {
      name: "ChatGPT",
      urlMatch: "chat.openai.com", // OpenAI still uses this
      urlMatch2: "chatgpt.com",
      messageSelector: "article, [data-testid*='conversation-turn']",
      contentSelector: ".markdown, div.flex-col.gap-1",
      roleSelector: "[data-testid*='author-role']",
    },
    claude: {
      name: "Claude",
      urlMatch: "claude.ai",
      messageSelector: "div.font-claude-message, div[class*='ChatMessage']",
      contentSelector: ".grid-cols-1, div[class*='Message'] > div",
      roleSelector: null,
    },
    grok: {
      name: "Grok",
      urlMatch: "grok.com",
      messageSelector: "div[data-testid='messageEntry'], article",
      contentSelector: "div[id^='message-id'] > div, .css-175oi2r",
      roleSelector: null,
    },
    generic: {
      name: "Generic",
      messageSelector: "article, div[class*='message'], div[data-message]",
      contentSelector: "div",
      roleSelector: null,
    }
  };

  function getActiveConfig() {
    const hostname = window.location.hostname;
    for (const key in configs) {
      if (configs[key].urlMatch && hostname.includes(configs[key].urlMatch)) {
        return { ...configs[key], id: key };
      }
      if (configs[key].urlMatch2 && hostname.includes(configs[key].urlMatch2)) {
        return { ...configs[key], id: key };
      }
    }
    return { ...configs.generic, id: "generic" };
  }

  function getAllVisibleMessages() {
    const config = getActiveConfig();
    const messages = document.querySelectorAll(config.messageSelector);
    return Array.from(messages).map((el, index) => ({
      element: el,
      text: el.innerText.trim(),
      config: config,
      index: index
    }));
  }

  return {
    getActiveConfig,
    getAllVisibleMessages
  };
})();
