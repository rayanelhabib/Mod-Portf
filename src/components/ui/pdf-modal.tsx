"use client";

import React, { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export function PdfModal({ isOpen, onClose, pdfUrl, title }: PdfModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4 sm:p-8">
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-white/80 backdrop-blur-md">
          <h3 className="font-semibold text-[#16181f]">{title}</h3>
          <div className="flex items-center gap-3">
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-black/5 text-[#16181f]/60 hover:text-[#16181f] transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-rose-50 text-[#16181f]/60 hover:text-rose-500 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* PDF Viewer - Using native iframe/embed for best compatibility without heavy libraries */}
        <div className="flex-1 w-full bg-[#f1f1f1] overflow-hidden">
          <iframe 
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-none"
            title={title}
          />
        </div>
      </div>
    </div>
  );
}
