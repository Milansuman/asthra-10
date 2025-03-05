"use client"

import MDEditor from '@uiw/react-md-editor';
import remarkGfm from 'remark-gfm'

export const Markdown = ({ children, full = false }: { children?: string | null, full?: boolean }) => {

    if (!children || children.length === 0) { return null }

    return (
        <div className={full ? "" : "max-h-24 overflow-hidden"}>
            <MDEditor.Markdown
                remarkPlugins={[remarkGfm]}
                className={"md-container"}
                source={children ?? "### Coming soon!"}
                style={{
                    whiteSpace: "pre-wrap",
                    background: "transparent",
                    color: "white",
                    wordBreak: 'break-word',
                }}
                components={{

                }} />
        </div>
    );
}