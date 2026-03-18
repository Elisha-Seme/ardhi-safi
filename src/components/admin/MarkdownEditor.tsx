"use client";

import { useState, useRef, useCallback } from "react";
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Link as LinkIcon,
    Image as ImageIcon,
    Quote,
    Code,
    Eye,
    Edit,
    Minus,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownEditorProps {
    name: string;
    defaultValue?: string;
    required?: boolean;
    rows?: number;
    placeholder?: string;
}

type ToolbarAction = {
    icon: React.ReactNode;
    label: string;
    prefix: string;
    suffix?: string;
    block?: boolean;
};

const TOOLBAR_ACTIONS: ToolbarAction[] = [
    { icon: <Bold size={14} />, label: "Bold", prefix: "**", suffix: "**" },
    { icon: <Italic size={14} />, label: "Italic", prefix: "_", suffix: "_" },
    { icon: <Heading1 size={14} />, label: "Heading 1", prefix: "## ", block: true },
    { icon: <Heading2 size={14} />, label: "Heading 2", prefix: "### ", block: true },
    { icon: <Quote size={14} />, label: "Quote", prefix: "> ", block: true },
    { icon: <Code size={14} />, label: "Code", prefix: "`", suffix: "`" },
    { icon: <List size={14} />, label: "Bullet List", prefix: "- ", block: true },
    { icon: <ListOrdered size={14} />, label: "Numbered List", prefix: "1. ", block: true },
    { icon: <Minus size={14} />, label: "Divider", prefix: "\n---\n", block: true },
    { icon: <LinkIcon size={14} />, label: "Link", prefix: "[", suffix: "](url)" },
    { icon: <ImageIcon size={14} />, label: "Image", prefix: "![alt](", suffix: ")" },
];

export default function MarkdownEditor({
    name,
    defaultValue = "",
    required,
    rows = 12,
    placeholder,
}: MarkdownEditorProps) {
    const [value, setValue] = useState(defaultValue);
    const [mode, setMode] = useState<"write" | "preview">("write");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const applyAction = useCallback(
        (action: ToolbarAction) => {
            const ta = textareaRef.current;
            if (!ta) return;

            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            const selected = value.slice(start, end);

            let insert: string;
            if (action.block && !action.suffix) {
                // Block-level: insert prefix at start of line
                const lineStart = value.lastIndexOf("\n", start - 1) + 1;
                const before = value.slice(0, lineStart);
                const after = value.slice(lineStart);
                insert = before + action.prefix + after;
                setValue(insert);
                setTimeout(() => {
                    ta.focus();
                    ta.setSelectionRange(
                        start + action.prefix.length,
                        end + action.prefix.length
                    );
                }, 0);
                return;
            }

            const prefix = action.prefix;
            const suffix = action.suffix || "";
            const replacement = selected
                ? `${prefix}${selected}${suffix}`
                : `${prefix}text${suffix}`;

            insert =
                value.slice(0, start) + replacement + value.slice(end);
            setValue(insert);

            setTimeout(() => {
                ta.focus();
                if (selected) {
                    ta.setSelectionRange(
                        start + prefix.length,
                        start + prefix.length + selected.length
                    );
                } else {
                    ta.setSelectionRange(
                        start + prefix.length,
                        start + prefix.length + 4
                    );
                }
            }, 0);
        },
        [value]
    );

    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-0.5 flex-wrap">
                    {TOOLBAR_ACTIONS.map((action) => (
                        <button
                            key={action.label}
                            type="button"
                            onClick={() => applyAction(action)}
                            title={action.label}
                            className="p-1.5 text-gray-500 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        >
                            {action.icon}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-1 bg-gray-200/60 rounded-lg p-0.5">
                    <button
                        type="button"
                        onClick={() => setMode("write")}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                            mode === "write"
                                ? "bg-white text-primary shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <Edit size={12} /> Write
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("preview")}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                            mode === "preview"
                                ? "bg-white text-primary shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <Eye size={12} /> Preview
                    </button>
                </div>
            </div>

            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={value} />

            {/* Editor / Preview */}
            {mode === "write" ? (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={rows}
                    required={required}
                    placeholder={placeholder}
                    className="w-full px-6 py-4 bg-white outline-none text-sm leading-relaxed font-mono resize-y min-h-[200px]"
                />
            ) : (
                <div className="px-6 py-4 min-h-[200px] prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-accent">
                    {value ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {value}
                        </ReactMarkdown>
                    ) : (
                        <p className="text-gray-400 italic">Nothing to preview yet...</p>
                    )}
                </div>
            )}
        </div>
    );
}
