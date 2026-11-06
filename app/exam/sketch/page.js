'use client';
import Icon from '@/components/Icon';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ScratchpadSketchMode() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen'); // 'pen' | 'eraser'
  const [color, setColor] = useState('#00241c');
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 4 : lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] p-3 space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-surface-container">
        <div className="flex items-center gap-2">
          <Link
            href="/exam/scratchpad"
            className="p-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors"
          >
            <Icon name="arrow_back" className="text-[20px]" />
          </Link>
          <span className="font-title-md text-primary font-semibold text-sm">
            Chemical Structure Sketchpad
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={clearCanvas}
            className="px-2.5 py-1 rounded bg-surface-container text-xs font-semibold text-on-surface-variant hover:text-error"
          >
            Clear
          </button>
          <Link
            href="/exam"
            className="px-3 py-1 bg-primary-container text-on-primary rounded text-xs font-semibold"
          >
            Return to Exam
          </Link>
        </div>
      </div>

      {/* Sketching Toolstrip */}
      <div className="flex items-center justify-between bg-surface-container-lowest p-2 rounded-lg border border-surface-container">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTool('pen')}
            className={`p-1.5 rounded ${tool === 'pen' ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant'}`}
            title="Pen"
          >
            <Icon name="draw" className="text-[18px]" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-1.5 rounded ${tool === 'eraser' ? 'bg-primary-container text-on-primary' : 'text-on-surface-variant'}`}
            title="Eraser"
          >
            <Icon name="ink_eraser" className="text-[18px]" />
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5">
          {['#00241c', '#9d4314', '#0d3b30', '#2563eb'].map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setTool('pen');
              }}
              style={{ backgroundColor: c }}
              className={`w-5 h-5 rounded-full transition-transform ${
                color === c && tool === 'pen' ? 'scale-125 ring-2 ring-primary ring-offset-1' : ''
              }`}
            />
          ))}
        </div>

        {/* Line Width */}
        <div className="flex items-center gap-1 text-xs text-on-surface-variant">
          <span>Width:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-16 accent-primary"
          />
        </div>
      </div>

      {/* HTML5 Drawing Canvas */}
      <div className="flex-1 w-full bg-white rounded-xl border border-surface-container overflow-hidden shadow-sm relative touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
        <div className="absolute bottom-2 left-2 pointer-events-none text-[11px] text-on-surface-variant/40 font-mono">
          Canvas active • Draw molecular graphs or arrows
        </div>
      </div>
    </div>
  );
}
