import React, { useState, useEffect } from 'react';
import { FileDown, Printer, Wand2, Save, FolderOpen } from 'lucide-react';
import Editor from './components/Editor';
import ExamPreview from './components/ExamPreview';
import { ExamData, INITIAL_EXAM_DATA } from './types';
import { generateExamContent } from './services/geminiService';
import { downloadDocx } from './services/docxService';

const STORAGE_KEY = 'examForge_savedData';

function App() {
  const [examData, setExamData] = useState<ExamData>(INITIAL_EXAM_DATA);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load saved data on startup
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setExamData(parsed);
      } catch (e) {
        console.error("Failed to load saved exam data", e);
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    try {
      const jsonString = JSON.stringify(examData);
      localStorage.setItem(STORAGE_KEY, jsonString);
      alert("Exam saved successfully to browser storage!");
    } catch (e: any) {
      console.error("Failed to save", e);
      if (e.name === 'QuotaExceededError') {
         alert("Failed to save: Storage limit exceeded. Try removing large logo images.");
      } else {
         alert("Failed to save exam.");
      }
    }
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      alert("No saved exam found in browser storage.");
      return;
    }

    if (window.confirm("Load saved exam? This will overwrite your current changes.")) {
      try {
        setExamData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
        alert("Error loading saved data. The file might be corrupted.");
      }
    }
  };

  const handleAIAutoFill = async () => {
    setIsGenerating(true);
    try {
      const generatedContent = await generateExamContent(
        examData.header.subject,
        examData.header.classGrade,
        "" // General topic
      );

      if (generatedContent) {
        setExamData(prev => ({
          ...prev,
          ...generatedContent
        }));
      } else {
        alert("Could not generate content. Please check if the API key is configured correctly.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible">
      {/* Top Toolbar */}
      <header className="bg-slate-800 text-white p-4 shadow-md z-10 flex justify-between items-center flex-shrink-0 no-print">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-serif font-bold text-xl">E</div>
            <h1 className="font-bold text-lg hidden md:block">ExamForge</h1>
        </div>

        <div className="flex gap-2">
            <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition-colors text-sm"
                title="Save to Browser Storage"
            >
                <Save size={16} />
                <span className="hidden sm:inline">Save</span>
            </button>
            <button 
                onClick={handleLoad}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition-colors text-sm"
                title="Load from Browser Storage"
            >
                <FolderOpen size={16} />
                <span className="hidden sm:inline">Load</span>
            </button>
            <div className="w-px bg-slate-600 mx-1"></div>
            <button 
                onClick={handleAIAutoFill}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors text-sm ${isGenerating ? 'bg-purple-800 text-gray-300' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
                <Wand2 size={16} />
                <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'AI Auto-Fill'}</span>
            </button>
            <button 
                onClick={() => downloadDocx(examData)}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors text-sm"
            >
                <FileDown size={16} />
                <span className="hidden sm:inline">Word (.docx)</span>
            </button>
             <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm"
            >
                <Printer size={16} />
                <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative print:block print:h-auto print:overflow-visible">
        {/* Editor Sidebar */}
        <div className="h-full z-20 print:hidden transition-all">
            <Editor 
                data={examData} 
                onChange={setExamData} 
                onGenerateAI={handleAIAutoFill}
                isGenerating={isGenerating}
            />
        </div>

        {/* Preview Area */}
        <main className="flex-1 bg-gray-100 h-full relative overflow-hidden print:overflow-visible print:h-auto print:bg-white">
            <ExamPreview data={examData} />
        </main>
      </div>
    </div>
  );
}

export default App;