/**
 * background.js
 * Handles persistent storage and communication for Pinit.
 */

console.log("Pinit: Background service worker active.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Logic: Use provided hostname if available (from popup), otherwise derive from sender tab (from content script)
  const derivedHostname = sender.tab?.url ? new URL(sender.tab.url).hostname : null;
  const hostname = request.hostname || derivedHostname || "global";
  const storageKey = `pinit_pins_${hostname}`;
  
  console.log(`Pinit: Background received action: ${request.action} for host: ${hostname}`);

  if (request.action === "savePin") {
    chrome.storage.local.get([storageKey], (result) => {
      const pins = result[storageKey] || [];
      const updatedPins = [request.pin, ...pins].slice(0, 20);
      chrome.storage.local.set({ [storageKey]: updatedPins }, () => {
        updateBadge(updatedPins.length, sender.tab?.id);
        sendResponse({ success: true, count: updatedPins.length });
      });
    });
    return true;
  }

  if (request.action === "getPins") {
    chrome.storage.local.get([storageKey], (result) => {
      sendResponse({ pins: result[storageKey] || [] });
    });
    return true;
  }

  if (request.action === "removePin") {
    chrome.storage.local.get([storageKey], (result) => {
      const pins = result[storageKey] || [];
      const updatedPins = pins.filter(p => p.id !== request.id);
      chrome.storage.local.set({ [storageKey]: updatedPins }, () => {
        updateBadge(updatedPins.length, sender.tab ? sender.tab.id : null);
        sendResponse({ success: true });
      });
    });
    return true;
  }
});

function updateBadge(count, tabId) {
    if (!tabId) return;
    if (count > 0) {
        chrome.action.setBadgeText({ text: count.toString(), tabId: tabId });
        chrome.action.setBadgeBackgroundColor({ color: "#3498db" });
    } else {
        chrome.action.setBadgeText({ text: "", tabId: tabId });
    }
}

// Global Command Listener
chrome.commands.onCommand.addListener((command) => {
  if (command === "capture-page") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "capturePage" });
      }
    });
  }
});
