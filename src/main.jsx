"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const file_saver_1 = require("file-saver");
require("./index.css");
const App = () => {
    const [domains, setDomains] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        chrome.storage.local.get("domains", (data) => {
            if (data.domains) {
                setDomains(data.domains);
            }
        });
    }, []);
    const downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," + domains.join("\n");
        const encodedUri = encodeURI(csvContent);
        (0, file_saver_1.saveAs)(encodedUri, "domains.csv");
    };
    const copyToClipboard = () => {
        const jsonContent = JSON.stringify(domains, null, 2);
        navigator.clipboard.writeText(jsonContent).then(() => {
            alert("Domains copied to clipboard!");
        });
    };
    return (<div className="p-4">
      <h1 className="text-xl font-bold mb-4">Requested Domains</h1>
      <ul className="list-disc list-inside mb-4">
        {domains.length > 0 ? (domains.map((domain, index) => <li key={index}>{domain}</li>)) : (<li>No domains have been requested yet.</li>)}
      </ul>
      <div className="flex space-x-4">
        <button onClick={downloadCSV} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Download CSV
        </button>
        <button onClick={copyToClipboard} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Copy to Clipboard
        </button>
      </div>
    </div>);
};
exports.default = App;
