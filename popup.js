document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("domains", (data) => {
    const domainList = document.getElementById("domain-list");
    const domains =
      (data.domains && JSON.parse(data.domains)[location.origin]) || [];
    if (domains && domains.domains.length > 0) {
      domains.forEach((domain) => {
        const li = document.createElement("li");
        li.textContent = domain;
        domainList.appendChild(li);
      });
    } else {
      domainList.innerHTML = "<li>No domains have been requested yet.</li>";
    }
  });
});
