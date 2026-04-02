/**
 * message-detector.js
 * Identifies the AI chat platform and provides selectors for message elements.
 */

window.Pinit = window.Pinit || {};

Pinit.MessageDetector = (() => {
  const configs = {
    chatgpt: {
      name: "ChatGPT",
      urlMatch: "chat.openai.com", 
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
    perplexity: {
      name: "Perplexity",
      urlMatch: "perplexity.ai",
      messageSelector: [
        "div.group",
        "div[class*='group/thread-item']",
        "div[data-testid='thread-item']",
        "article",
        "div.w-full.border-b"
      ].join(", "),
      contentSelector: [
        ".prose",
        "div.font-sans.break-words",
        "[data-testid='message-content']",
        "div.max-w-full"
      ].join(", "),
      roleSelector: null,
    },
    grok: {
      name: "Grok",
      urlMatch: "grok.com",
      urlMatch2: "x.ai",
      messageSelector: [
        "div[data-testid='messageEntry']",
        "div[data-testid='cellInnerDiv']",
        "div[data-testid='conversation-turn']",
        "div[data-testid*='message']",
        "article",
        "[role='article']",
        "div.flex-col.items-center > div.w-full",
        "div[class*='px-gutter'] > div.relative",
        ".message-row",
        "div.relative.group"
      ].join(", "),
      contentSelector: [
        "div[id^='message-id'] > div",
        "[data-testid='tweetText']",
        "div[class*='css-175oi2r'] > div",
        ".markdown",
        "div[dir='auto']",
        ".text-base", 
        "div.flex-col > div.relative"
      ].join(", "),
      roleSelector: null,
    },
    generic: {
      name: "Generic",
      messageSelector: "article, [role='article'], div[class*='message'], div[data-message], [data-testid*='turn'], [data-testid*='message']",
      contentSelector: ".markdown, .message-content, div",
      roleSelector: null,
    }
  };

  function getActiveConfig() {
    const hostname = window.location.hostname;
    
    // Explicit checks for common platforms
    if (hostname.includes("grok.com") || hostname.includes("x.ai")) {
        return { ...configs.grok, id: "grok" };
    }
    if (hostname.includes("perplexity.ai")) {
        return { ...configs.perplexity, id: "perplexity" };
    }

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
