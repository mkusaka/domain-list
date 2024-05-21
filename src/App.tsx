import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import "./index.css";

const App: React.FC = () => {
  const [domains, setDomains] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local.get("domains", (data) => {
      if (data.domains) {
        setDomains(data.domains);
      }
    });
  }, []);

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + domains.join("\n");
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "domains.csv");
  };

  const copyToClipboard = () => {
    const jsonContent = JSON.stringify(domains, null, 2);
    navigator.clipboard.writeText(jsonContent).then(() => {
      alert("Domains copied to clipboard!");
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Requested Domains</h1>
      <ul className="list-disc list-inside mb-4">
        {domains.length > 0 ? (
          domains.map((domain, index) => <li key={index}>{domain}</li>)
        ) : (
          <li>No domains have been requested yet.</li>
        )}
      </ul>
      <div className="flex space-x-4">
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download CSV
        </button>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default App;
