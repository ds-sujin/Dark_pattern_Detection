'use client'

import { useRef, useEffect } from 'react'

interface MarkdownEditorAreaProps {
  value: string
  onChange: (text: string) => void
}

export default function MarkdownEditorArea({ value, onChange }: MarkdownEditorAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="h-full p-4 bg-white">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="w-full h-full min-h-[500px] outline-none resize-none font-mono p-2 text-base leading-relaxed"
        placeholder="Type your markdown here..."
        spellCheck={false}
      />
    </div>
  )
}
