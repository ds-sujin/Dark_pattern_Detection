'use client'

import { useState, useEffect } from 'react'
import SplitPane from 'react-split-pane'
import dynamic from 'next/dynamic'
import MarkdownToolbar from './MarkdownToolbar'
import MarkdownPreview from './MarkdownPreview'
import Header from './Header'

const MarkdownEditorArea = dynamic(() => import('./MarkdownEditorArea'), {
  ssr: false,
})

export default function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState<string>(`## 안녕하세요. dp-detection에 오신 것을 환영해요!

![dp-detection](/assets/readme/dp-detection.png)

## 초기 프론트 개발 준비 중

- 첫번째 기능 확인`)

  // Handle toolbar actions
  const handleBoldClick = () => {
    const updatedText = `${markdownText}**Bold Text**`
    setMarkdownText(updatedText)
  }

  const handleItalicClick = () => {
    const updatedText = `${markdownText}_Italic Text_`
    setMarkdownText(updatedText)
  }

  const handleStrikethroughClick = () => {
    const updatedText = `${markdownText}~~Strikethrough Text~~`
    setMarkdownText(updatedText)
  }

  const handleUnderlineClick = () => {
    const updatedText = `${markdownText}<u>Underlined Text</u>`
    setMarkdownText(updatedText)
  }

  const handleHeaderClick = (level: number) => {
    const headerPrefix = '#'.repeat(level) + ' '
    const updatedText = `${markdownText}${headerPrefix}Header ${level}\n`
    setMarkdownText(updatedText)
  }

  const handleListClick = (ordered: boolean) => {
    if (ordered) {
      const updatedText = `${markdownText}\n1. Item 1\n2. Item 2\n3. Item 3\n`
      setMarkdownText(updatedText)
    } else {
      const updatedText = `${markdownText}\n- Item 1\n- Item 2\n- Item 3\n`
      setMarkdownText(updatedText)
    }
  }

  const handleLinkClick = () => {
    const updatedText = `${markdownText}[Link Text](https://example.com)`
    setMarkdownText(updatedText)
  }

  const handleImageClick = () => {
    const updatedText = `${markdownText}![Alt Text](https://example.com/image.jpg)`
    setMarkdownText(updatedText)
  }

  const handleCodeBlockClick = () => {
    const updatedText = `${markdownText}\n\`\`\`js\n// Your code here\nconsole.log('Hello EASYME.md!');\n\`\`\`\n`
    setMarkdownText(updatedText)
  }

  const handleTableClick = () => {
    const tableTemplate = `
| title1 | title2 | title3 |
|--------|--------|--------|
| 1      | 2      | 3      |
| 4      | 5      | 6      |
| 7      | 8      | 9      |
`
    const updatedText = `${markdownText}${tableTemplate}`
    setMarkdownText(updatedText)
  }

  const handleTextChange = (newText: string) => {
    setMarkdownText(newText)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#7e8caa]">
      <Header />

      <div className="flex flex-col flex-1 px-4 py-2">
        <MarkdownToolbar
          onBoldClick={handleBoldClick}
          onItalicClick={handleItalicClick}
          onStrikethroughClick={handleStrikethroughClick}
          onUnderlineClick={handleUnderlineClick}
          onHeaderClick={handleHeaderClick}
          onListClick={handleListClick}
          onLinkClick={handleLinkClick}
          onImageClick={handleImageClick}
          onCodeBlockClick={handleCodeBlockClick}
          onTableClick={handleTableClick}
        />

        <div className="flex-1 mt-2">
          <SplitPane
            split="vertical"
            minSize={300}
            defaultSize="50%"
            style={{ position: 'relative' }}
            pane1Style={{ overflow: 'auto' }}
            pane2Style={{ overflow: 'auto' }}
          >
            <MarkdownEditorArea
              value={markdownText}
              onChange={handleTextChange}
            />
            <MarkdownPreview markdownText={markdownText} />
          </SplitPane>
        </div>
      </div>
    </div>
  )
}
