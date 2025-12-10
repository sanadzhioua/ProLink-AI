'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Check, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default function CVUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [extractedText, setExtractedText] = useState("");
    const [atsScore, setAtsScore] = useState(0);
    const [report, setReport] = useState("");

    const onDrop = useCallback(async (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setUploading(true);

            const formData = new FormData();
            formData.append('file', uploadedFile);

            try {
                const response = await axios.post('http://localhost:5000/api/cv/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setExtractedText(response.data.text);
            } catch (err) {
                console.error("Upload failed", err);
                const errorMsg = err.response?.data?.error || err.message;
                alert(`Failed to extract text: ${errorMsg}. ensure backend is running.`);
            } finally {
                setUploading(false);
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
        maxFiles: 1
    });

    const handleOptimize = async () => {
        if (!extractedText) return;
        setAnalyzing(true);

        try {
            const response = await axios.post('http://localhost:5000/api/cv/optimize', {
                cvText: extractedText
            });
            setAtsScore(response.data.score);
            setReport(response.data.markdown_report);
        } catch (err) {
            console.error("Optimization failed", err);
            const errorMsg = err.response?.data?.error || err.message;
            alert(`Analysis failed: ${errorMsg}. ensure backend is running.`);
        } finally {
            setAnalyzing(false);
        }
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
        setExtractedText("");
        setAtsScore(0);
        setReport("");
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary-600" />
                        CV Optimization
                    </h2>
                    <p className="text-sm text-slate-500">Upload your resumes (PDF/DOCX) for AI analysis</p>
                </div>
                {atsScore > 0 && (
                    <div className={`px-3 py-1 rounded-full text-sm font-bold border ${atsScore >= 80 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                        ATS Score: {atsScore}/100
                    </div>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
                {!file ? (
                    <div
                        {...getRootProps()}
                        className={`flex-1 min-h-[200px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all
                ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'}
              `}
                    >
                        <input {...getInputProps()} />
                        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-slate-900 font-medium text-lg">Click or drag CV here</p>
                        <p className="text-slate-500 text-sm mt-1">Supports PDF & DOCX up to 10MB</p>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center justify-between p-4 bg-primary-50 border border-primary-100 rounded-xl">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-red-500">
                                    <FileText />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-900 truncate">{file.name}</p>
                                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                                </div>
                            </div>
                            <button onClick={removeFile} className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {uploading ? (
                            <div className="flex items-center gap-3 text-sm text-slate-500 p-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Extracting text...
                            </div>
                        ) : (
                            <>
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 max-h-[150px] overflow-y-auto text-xs font-mono text-slate-600">
                                    {extractedText}
                                </div>

                                {!report && (
                                    <button
                                        onClick={handleOptimize}
                                        disabled={analyzing || uploading}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {analyzing ? (
                                            <><Loader2 className="animate-spin" /> Analyzing with AI...</>
                                        ) : (
                                            <><Sparkles className="w-5 h-5" /> Optimize CV</>
                                        )}
                                    </button>
                                )}
                            </>
                        )}

                        {report && (
                            <div className="mt-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm prose prose-sm max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
                                <ReactMarkdown>{report}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
