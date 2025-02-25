import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown';

export const Markdown = ({ children }: { children?: string | null }) => {

    if (!children || children.length === 0) { return null }

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {children ?? "### Coming soon!"}
        </ReactMarkdown>
    );
}