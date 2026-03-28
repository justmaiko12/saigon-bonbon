"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

// ─── Types ──────────────────────────────────────────────────
interface ElementStyles {
  fontSize?: number;       // px
  fontWeight?: number;     // 100-900
  letterSpacing?: number;  // px
  lineHeight?: number;     // unitless multiplier
  opacity?: number;        // 0-1
  color?: string;          // hex
  scale?: number;          // multiplier (1 = 100%)
  rotate?: number;         // degrees
}

interface EditState {
  texts: Record<string, string>;
  images: Record<string, string>;
  offsets: Record<string, { x: number; y: number }>;
  sizes: Record<string, { w?: number; h?: number }>;
  styles: Record<string, ElementStyles>;
}

interface EditContextType {
  isEditing: boolean;
  state: EditState;
  selectedId: string | null;
  selectedType: "text" | "image" | "drag" | null;
  setSelected: (id: string | null, type?: "text" | "image" | "drag") => void;
  updateText: (id: string, value: string) => void;
  updateImage: (id: string, dataUrl: string) => void;
  updateOffset: (id: string, x: number, y: number) => void;
  updateSize: (id: string, w?: number, h?: number) => void;
  updateStyle: (id: string, styles: Partial<ElementStyles>) => void;
  getText: (id: string, fallback: string) => string;
  getImage: (id: string, fallback: string) => string;
  getOffset: (id: string) => { x: number; y: number };
  getSize: (id: string) => { w?: number; h?: number };
  getStyles: (id: string) => ElementStyles;
}

const STORAGE_KEY = "sbb-edit-state";
const UNDO_KEY = "sbb-edit-undo";
const MAX_UNDO = 50;

const emptyState: EditState = { texts: {}, images: {}, offsets: {}, sizes: {}, styles: {} };

const EditContext = createContext<EditContextType>({
  isEditing: false,
  state: emptyState,
  selectedId: null,
  selectedType: null,
  setSelected: () => {},
  updateText: () => {},
  updateImage: () => {},
  updateOffset: () => {},
  updateSize: () => {},
  updateStyle: () => {},
  getText: (_, f) => f,
  getImage: (_, f) => f,
  getOffset: () => ({ x: 0, y: 0 }),
  getSize: () => ({}),
  getStyles: () => ({}),
});

export const useEdit = () => useContext(EditContext);

// ─── Provider ───────────────────────────────────────────────
export function EditProvider({ children }: { children: React.ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState<EditState>(emptyState);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"text" | "image" | "drag" | null>(null);
  const [undoStack, setUndoStack] = useState<EditState[]>([]);
  const [redoStack, setRedoStack] = useState<EditState[]>([]);
  const isInitialLoad = useRef(true);
  const skipUndo = useRef(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...emptyState, ...parsed });
      }
      const savedUndo = localStorage.getItem(UNDO_KEY);
      if (savedUndo) setUndoStack(JSON.parse(savedUndo));
    } catch {}
    isInitialLoad.current = false;
  }, []);

  // Persist state (with quota protection)
  useEffect(() => {
    if (!isInitialLoad.current) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // localStorage full — save without images
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, images: {} }));
        } catch {}
      }
    }
  }, [state]);

  // Persist undo (light)
  useEffect(() => {
    if (!isInitialLoad.current) {
      try {
        const lightStack = undoStack.map(s => ({ ...s, images: {} }));
        localStorage.setItem(UNDO_KEY, JSON.stringify(lightStack.slice(-20)));
      } catch {}
    }
  }, [undoStack]);

  const setSelected = useCallback((id: string | null, type?: "text" | "image" | "drag") => {
    setSelectedId(id);
    setSelectedType(type ?? null);
  }, []);

  const pushUndo = useCallback((prev: EditState) => {
    if (skipUndo.current) { skipUndo.current = false; return; }
    setUndoStack(stack => [...stack.slice(-MAX_UNDO), prev]);
    setRedoStack([]);
  }, []);

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack(stack => [...stack, state]);
    skipUndo.current = true;
    setState(prev);
    setUndoStack(stack => stack.slice(0, -1));
  }, [undoStack, state]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack(stack => [...stack, state]);
    skipUndo.current = true;
    setState(next);
    setRedoStack(stack => stack.slice(0, -1));
  }, [redoStack, state]);

  // Cmd+Z / Cmd+Shift+Z
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isEditing) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isEditing, handleUndo, handleRedo]);

  // Deselect when clicking background
  useEffect(() => {
    if (!isEditing) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-edit-id]") || target.closest("[data-edit-toolbar]")) return;
      setSelectedId(null);
      setSelectedType(null);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [isEditing]);

  const updateText = useCallback((id: string, value: string) => {
    setState(s => { pushUndo(s); return { ...s, texts: { ...s.texts, [id]: value } }; });
  }, [pushUndo]);

  const updateImage = useCallback((id: string, dataUrl: string) => {
    setState(s => { pushUndo(s); return { ...s, images: { ...s.images, [id]: dataUrl } }; });
  }, [pushUndo]);

  const updateOffset = useCallback((id: string, x: number, y: number) => {
    setState(s => ({ ...s, offsets: { ...s.offsets, [id]: { x, y } } }));
  }, []);

  const pushUndoManual = useCallback(() => {
    setState(s => { pushUndo(s); return s; });
  }, [pushUndo]);

  const updateSize = useCallback((id: string, w?: number, h?: number) => {
    setState(s => { pushUndo(s); return { ...s, sizes: { ...s.sizes, [id]: { w, h } } }; });
  }, [pushUndo]);

  const updateStyle = useCallback((id: string, newStyles: Partial<ElementStyles>) => {
    setState(s => {
      pushUndo(s);
      return { ...s, styles: { ...s.styles, [id]: { ...s.styles[id], ...newStyles } } };
    });
  }, [pushUndo]);

  const getText = useCallback((id: string, fallback: string) => state.texts[id] ?? fallback, [state.texts]);
  const getImage = useCallback((id: string, fallback: string) => state.images[id] ?? fallback, [state.images]);
  const getOffset = useCallback((id: string) => state.offsets[id] ?? { x: 0, y: 0 }, [state.offsets]);
  const getSize = useCallback((id: string) => state.sizes[id] ?? {}, [state.sizes]);
  const getStyles = useCallback((id: string) => state.styles[id] ?? {}, [state.styles]);

  const handleExport = () => {
    const json = JSON.stringify(state, null, 2);
    navigator.clipboard.writeText(json);
    alert("Changes copied to clipboard! Send this to Claude to make permanent.");
  };

  const handleReset = () => {
    if (confirm("Reset all visual edits? This cannot be undone.")) {
      setState(emptyState);
      setUndoStack([]);
      setRedoStack([]);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(UNDO_KEY);
      window.location.reload();
    }
  };

  return (
    <EditContext.Provider value={{ isEditing, state, selectedId, selectedType, setSelected, updateText, updateImage, updateOffset, updateSize, updateStyle, getText, getImage, getOffset, getSize, getStyles }}>
      <UndoContext.Provider value={{ pushUndoManual }}>
        {children}

        {/* ─── Properties Panel (shows when element selected) ─── */}
        {isEditing && selectedId && (
          <PropertiesPanel
            selectedId={selectedId}
            selectedType={selectedType}
            styles={getStyles(selectedId)}
            onUpdateStyle={(styles) => updateStyle(selectedId, styles)}
            onClose={() => { setSelectedId(null); setSelectedType(null); }}
          />
        )}

        {/* Edit toolbar hidden in production */}
      </UndoContext.Provider>
    </EditContext.Provider>
  );
}

const UndoContext = createContext<{ pushUndoManual: () => void }>({ pushUndoManual: () => {} });
export const useUndo = () => useContext(UndoContext);

// ─── Properties Panel ───────────────────────────────────────
function PropertiesPanel({
  selectedId,
  selectedType,
  styles,
  onUpdateStyle,
  onClose,
}: {
  selectedId: string;
  selectedType: "text" | "image" | "drag" | null;
  styles: ElementStyles;
  onUpdateStyle: (s: Partial<ElementStyles>) => void;
  onClose: () => void;
}) {
  const isTextOrDrag = selectedType === "text" || selectedType === "drag";

  return (
    <div
      data-edit-toolbar
      className="fixed top-6 left-6 z-[201] bg-black/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl w-[260px] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div>
          <p className="text-white text-xs font-bold tracking-wider">PROPERTIES</p>
          <p className="text-white/40 text-[9px] font-mono mt-0.5 truncate max-w-[180px]">{selectedId}</p>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white text-lg leading-none transition-colors w-6 h-6 flex items-center justify-center rounded hover:bg-white/10">
          ✕
        </button>
      </div>

      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Font Size */}
        {isTextOrDrag && (
          <StyleSlider
            label="Font Size"
            value={styles.fontSize}
            min={8}
            max={200}
            step={1}
            unit="px"
            onChange={(v) => onUpdateStyle({ fontSize: v })}
            onClear={() => onUpdateStyle({ fontSize: undefined })}
          />
        )}

        {/* Font Weight */}
        {isTextOrDrag && (
          <StyleSlider
            label="Font Weight"
            value={styles.fontWeight}
            min={100}
            max={900}
            step={100}
            onChange={(v) => onUpdateStyle({ fontWeight: v })}
            onClear={() => onUpdateStyle({ fontWeight: undefined })}
          />
        )}

        {/* Letter Spacing */}
        {isTextOrDrag && (
          <StyleSlider
            label="Letter Spacing"
            value={styles.letterSpacing}
            min={-5}
            max={30}
            step={0.5}
            unit="px"
            onChange={(v) => onUpdateStyle({ letterSpacing: v })}
            onClear={() => onUpdateStyle({ letterSpacing: undefined })}
          />
        )}

        {/* Line Height */}
        {isTextOrDrag && (
          <StyleSlider
            label="Line Height"
            value={styles.lineHeight}
            min={0.5}
            max={3}
            step={0.05}
            unit="x"
            onChange={(v) => onUpdateStyle({ lineHeight: v })}
            onClear={() => onUpdateStyle({ lineHeight: undefined })}
          />
        )}

        {/* Opacity */}
        <StyleSlider
          label="Opacity"
          value={styles.opacity}
          min={0}
          max={1}
          step={0.05}
          unit=""
          onChange={(v) => onUpdateStyle({ opacity: v })}
          onClear={() => onUpdateStyle({ opacity: undefined })}
        />

        {/* Scale */}
        <StyleSlider
          label="Scale"
          value={styles.scale}
          min={0.1}
          max={3}
          step={0.05}
          unit="x"
          onChange={(v) => onUpdateStyle({ scale: v })}
          onClear={() => onUpdateStyle({ scale: undefined })}
        />

        {/* Rotation */}
        <StyleSlider
          label="Rotation"
          value={styles.rotate}
          min={-180}
          max={180}
          step={1}
          unit="°"
          onChange={(v) => onUpdateStyle({ rotate: v })}
          onClear={() => onUpdateStyle({ rotate: undefined })}
        />

        {/* Color */}
        {isTextOrDrag && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-white/60 text-[10px] font-bold tracking-widest uppercase">Color</label>
              {styles.color && (
                <button onClick={() => onUpdateStyle({ color: undefined })} className="text-white/30 hover:text-white/60 text-[9px] font-mono">
                  reset
                </button>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={styles.color || "#ffffff"}
                onChange={(e) => onUpdateStyle({ color: e.target.value })}
                className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md"
              />
              <div className="flex gap-1">
                {["#ffffff", "#FF107A", "#FF5E00", "#67B626", "#D5A1E3", "#FFD2CD", "#B4FFED"].map(c => (
                  <button
                    key={c}
                    onClick={() => onUpdateStyle({ color: c })}
                    className={`w-5 h-5 rounded-full border transition-all ${styles.color === c ? "border-cyan-400 scale-110" : "border-white/20 hover:border-white/40"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Reusable slider for style props ────────────────────────
function StyleSlider({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
  onClear,
}: {
  label: string;
  value: number | undefined;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
  onClear: () => void;
}) {
  const hasValue = value !== undefined;
  const displayValue = value ?? ((min + max) / 2);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-white/60 text-[10px] font-bold tracking-widest uppercase">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-[10px] font-mono tabular-nums">
            {hasValue ? `${Math.round(value * 100) / 100}${unit}` : "auto"}
          </span>
          {hasValue && (
            <button onClick={onClear} className="text-white/30 hover:text-white/60 text-[9px] font-mono">
              reset
            </button>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={displayValue}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:shadow-lg"
      />
    </div>
  );
}

// ─── Build inline style from ElementStyles ──────────────────
function buildInlineStyle(styles: ElementStyles): React.CSSProperties {
  const s: React.CSSProperties = {};
  if (styles.fontSize !== undefined) s.fontSize = `${styles.fontSize}px`;
  if (styles.fontWeight !== undefined) s.fontWeight = styles.fontWeight;
  if (styles.letterSpacing !== undefined) s.letterSpacing = `${styles.letterSpacing}px`;
  if (styles.lineHeight !== undefined) s.lineHeight = styles.lineHeight;
  if (styles.opacity !== undefined) s.opacity = styles.opacity;
  if (styles.color !== undefined) { s.color = styles.color; s.WebkitTextFillColor = styles.color; }
  const transforms: string[] = [];
  if (styles.scale !== undefined) transforms.push(`scale(${styles.scale})`);
  if (styles.rotate !== undefined) transforms.push(`rotate(${styles.rotate}deg)`);
  if (transforms.length) s.transform = transforms.join(" ");
  return s;
}

// ─── Editable Text ──────────────────────────────────────────
export function EditableText({
  id,
  children,
  className = "",
  as: Tag = "span",
  ...props
}: {
  id: string;
  children: string;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}) {
  const { isEditing, getText, updateText, selectedId, setSelected, getStyles } = useEdit();
  const ref = useRef<HTMLElement>(null);
  const text = getText(id, children);
  const styles = getStyles(id);
  const inlineStyle = buildInlineStyle(styles);

  const handleBlur = () => {
    if (ref.current) {
      updateText(id, ref.current.innerText);
    }
  };

  const isSelected = selectedId === id;

  return <Tag
    ref={ref}
    data-edit-id={id}
    className={`${className} ${isEditing ? "cursor-text outline-none ring-1 ring-transparent hover:ring-cyan-400/50 focus:ring-cyan-400 rounded-sm transition-all" : ""} ${isSelected && isEditing ? "ring-2 ring-cyan-400" : ""}`}
    style={inlineStyle}
    contentEditable={isEditing}
    suppressContentEditableWarning
    onFocus={() => isEditing && setSelected(id, "text")}
    onBlur={handleBlur}
    {...props}
  >
    {text}
  </Tag>;
}

// ─── Editable Image ─────────────────────────────────────────
export function EditableImage({
  id,
  src,
  alt,
  className = "",
  fill,
  width,
  height,
  ...props
}: {
  id: string;
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  [key: string]: any;
}) {
  const { isEditing, getImage, updateImage, setSelected, selectedId, getStyles } = useEdit();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageSrc = getImage(id, src);
  const styles = getStyles(id);
  const inlineStyle = buildInlineStyle(styles);
  const isSelected = selectedId === id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateImage(id, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      data-edit-id={id}
      className={`relative ${isEditing ? "group" : ""} ${isSelected && isEditing ? "ring-2 ring-cyan-400 rounded-lg" : ""}`}
      style={fill ? { position: "relative", width: "100%", height: "100%", ...inlineStyle } : inlineStyle}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isEditing ? "cursor-pointer" : ""}`}
        style={fill ? { position: "absolute", width: "100%", height: "100%", objectFit: "contain" } : { width: width ?? undefined, height: height ?? undefined }}
        onClick={() => {
          if (isEditing) {
            setSelected(id, "image");
            fileInputRef.current?.click();
          }
        }}
        {...props}
      />
      {isEditing && (
        <>
          <div
            className="absolute inset-0 bg-cyan-500/0 hover:bg-cyan-500/20 transition-colors cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 rounded-lg"
            onClick={() => { setSelected(id, "image"); fileInputRef.current?.click(); }}
          >
            <span className="bg-black/80 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full">
              REPLACE
            </span>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
        </>
      )}
    </div>
  );
}

// ─── Draggable Wrapper ──────────────────────────────────────
export function Draggable({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { isEditing, getOffset, updateOffset, selectedId, setSelected, getStyles } = useEdit();
  const { pushUndoManual } = useUndo();
  const offset = getOffset(id);
  const styles = getStyles(id);
  const inlineStyle = buildInlineStyle(styles);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });

  const isSelected = selectedId === id;

  const onPointerDown = (e: React.PointerEvent) => {
    if (!isEditing) return;
    const target = e.target as HTMLElement;
    if (target.contentEditable === "true" || target.tagName === "INPUT") return;

    e.preventDefault();
    dragging.current = true;
    start.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { ...offset };
    setSelected(id, "drag");
    pushUndoManual();
    ref.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    updateOffset(id, startOffset.current.x + dx, startOffset.current.y + dy);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    ref.current?.releasePointerCapture(e.pointerId);
  };

  // Merge drag transform with style transform
  const dragTransform = `translate(${offset.x}px, ${offset.y}px)`;
  const styleTransform = inlineStyle.transform || "";
  const combinedTransform = `${dragTransform} ${styleTransform}`.trim();

  return (
    <div
      ref={ref}
      data-edit-id={id}
      className={`${className} ${isEditing ? "cursor-grab active:cursor-grabbing" : ""} ${isSelected && isEditing ? "outline outline-2 outline-cyan-400/60 outline-offset-4 rounded-lg" : ""}`}
      style={{
        ...inlineStyle,
        transform: combinedTransform,
        transition: dragging.current ? "none" : "transform 0.15s ease",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {children}
    </div>
  );
}
