'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'

interface MarkdownPreviewProps {
  markdownText: string
}

export default function MarkdownPreview({ markdownText }: MarkdownPreviewProps) {
  return (
    <div className="h-full p-4 bg-white overflow-auto relative">
      {/* Cartoon character in the corner */}
      <div className="absolute top-4 right-4 w-32 h-32 z-10">
        <Image
          src="https://web-assets.same.dev/4095266993/2793849083.png"
          alt="EASYME.md Cartoon"
          width={128}
          height={128}
          style={{ objectFit: 'contain', opacity: 0.7 }}
        />
      </div>

      <div className="prose max-w-none">
        <h1 className="text-xl font-bold border-b pb-2 mb-4">예시 미리보기</h1>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            img({ node, ...props }) {
              return (
                <span className="inline-block relative">
                  <img
                    src={props.src || ''}
                    alt={props.alt || ''}
                    style={{ maxWidth: '100%' }}
                  />
                </span>
              )
            },
          }}
        >
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  )
}
