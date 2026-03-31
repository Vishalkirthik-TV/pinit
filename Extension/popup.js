/**
 * popup.js
 * Handles pin listing and restoration triggers in the popup UI.
 */

document.addEventListener("DOMContentLoaded", async () => {
    const pinList = document.getElementById("pinList");
    const btnPinPage = document.getElementById("btnPinPage");
    
    // Get current tab to know the domain
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) return;

    let hostname = "global";
    try {
        hostname = new URL(tab.url).hostname;
    } catch(e) {
        console.error("Pinit: Invalid URL in popup context", tab.url);
    }

    // Initial load
    refreshPins();

    if (btnPinPage && tab) {
        btnPinPage.addEventListener("click", () => {
            chrome.tabs.sendMessage(tab.id, { action: "capturePage" }, (response) => {
                window.close();
            });
        });
    }

    function refreshPins() {
        // Load pins from background storage for THIS hostname
        chrome.runtime.sendMessage({ action: "getPins", hostname: hostname }, (response) => {
            if (response && response.pins && response.pins.length > 0) {
                renderPins(response.pins, tab.id);
            } else {
                renderEmptyState();
            }
        });
    }

    function renderPins(pins, tabId) {
        pinList.innerHTML = "";
        
        pins.forEach(pin => {
            const card = document.createElement("div");
            card.className = "pin-card";
            
            card.innerHTML = `
                <div class="pin-text">${escapeHtml(pin.textPreview)}</div>
                <div class="pin-meta">
                    <span class="pin-time">${new Date(pin.position.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <div class="pin-actions">
                        <button class="btn-icon btn-delete" data-id="${pin.id}">✖</button>
                    </div>
                </div>
            `;

            card.addEventListener("click", (e) => {
                if (e.target.classList.contains("btn-delete")) {
                    removePin(pin.id);
                    e.stopPropagation();
                    return;
                }
                const currentUrlWithoutHash = tab.url ? tab.url.split('#')[0] : "";
                const pinUrlWithoutHash = pin.url ? pin.url.split('#')[0] : "";

                if (pin.isPagePin || (pin.url && currentUrlWithoutHash !== pinUrlWithoutHash)) {
                    if (currentUrlWithoutHash === pinUrlWithoutHash) {
                       chrome.tabs.sendMessage(tabId, { action: "restorePin", pin: pin }, (response) => {
                           if (response && response.success) window.close();
                       });
                    } else {
                       chrome.storage.local.set({ pendingRestore: pin }, () => {
                           chrome.tabs.update(tabId, { url: pin.url }, () => {
                               window.close();
                           });
                       });
                    }
                } else {
                    // Normal message pin on same page
                    chrome.tabs.sendMessage(tabId, { action: "restorePin", pin: pin }, (response) => {
                        if (response && response.success) {
                            window.close(); 
                        }
                    });
                }
            });

            pinList.appendChild(card);
        });
    }

    function removePin(id) {
        chrome.runtime.sendMessage({ action: "removePin", id: id, hostname: hostname }, (response) => {
             refreshPins();
        });
    }

    function renderEmptyState() {
        pinList.innerHTML = `
            <div class="pinit-empty">
                <p>No pins yet on <b>${hostname}</b>.</p>
                <p style="font-size: 11px; margin-top: 8px;">Click "Pin Current Page View" above, or hover over a chat message in supported AI apps to pin it.</p>
            </div>
        `;
    }

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
});