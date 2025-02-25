import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export const Markdown = ({ children, full = false }: { children?: string | null, full?: boolean }) => {

    if (!children || children.length === 0) { return null }

    return (
        <div className={cn("md-container text-balance overflow-scroll break-all", full ? "" : "max-h-24 overflow-hidden")}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {children ?? "### Coming soon!"}
            </ReactMarkdown>
        </div>
    );
}