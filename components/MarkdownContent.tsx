import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100 flex items-center gap-3">
            <span className="inline-block w-1 h-5 rounded-full bg-betapower-azure shrink-0" />
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-2 mb-6 pl-1">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="flex gap-3 text-gray-700">
            <span className="text-betapower-azure mt-1 shrink-0 font-bold">·</span>
            <span className="leading-relaxed">{children}</span>
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
