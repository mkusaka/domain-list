"use strict";
let domains = new Set();
chrome.webRequest.onBeforeRequest.addListener((details) => {
    const url = new URL(details.url);
    if (url.origin !== location.origin) {
        domains.add(url.origin);
    }
    console.log(url);
    chrome.storage.local.set({ domains: Array.from(domains) });
}, { urls: ["<all_urls>"] });
chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get("domains", (data) => {
        if (data.domains && data.domains.length > 0) {
            console.log("Requested Domains:", data.domains);
            alert("Requested Domains:\n" + data.domains.join("\n"));
        }
        else {
            alert("No domains have been requested yet.");
        }
    });
});
