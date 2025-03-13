'use client'

import { useState } from 'react'
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaImage,
  FaCode,
  FaTable
} from 'react-icons/fa'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface MarkdownToolbarProps {
  onBoldClick: () => void
  onItalicClick: () => void
  onStrikethroughClick: () => void
  onUnderlineClick: () => void
  onHeaderClick: (level: number) => void
  onListClick: (ordered: boolean) => void
  onLinkClick: () => void
  onImageClick: () => void
  onCodeBlockClick: () => void
  onTableClick?: () => void
}

export default function MarkdownToolbar({
  onBoldClick,
  onItalicClick,
  onStrikethroughClick,
  onUnderlineClick,
  onHeaderClick,
  onListClick,
  onLinkClick,
  onImageClick,
  onCodeBlockClick,
  onTableClick = () => {},
}: MarkdownToolbarProps) {
  return (
    <div className="flex items-center p-2 bg-white rounded-sm shadow-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-4 h-10 mr-1">
            Select Header
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onHeaderClick(1)}>
            H1 Header
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onHeaderClick(2)}>
            H2 Header
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onHeaderClick(3)}>
            H3 Header
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onHeaderClick(4)}>
            H4 Header
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onHeaderClick(5)}>
            H5 Header
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onHeaderClick(6)}>
            H6 Header
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center border-l border-r px-2 mx-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBoldClick}
          className="toolbar-button"
          title="Bold"
        >
          <FaBold />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onItalicClick}
          className="toolbar-button"
          title="Italic"
        >
          <FaItalic />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onStrikethroughClick}
          className="toolbar-button"
          title="Strikethrough"
        >
          <FaStrikethrough />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onUnderlineClick}
          className="toolbar-button"
          title="Underline"
        >
          <FaUnderline />
        </Button>
      </div>

      <div className="flex items-center border-r px-2 mx-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onListClick(false)}
          className="toolbar-button"
          title="Unordered List"
        >
          <FaListUl />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onListClick(true)}
          className="toolbar-button"
          title="Ordered List"
        >
          <FaListOl />
        </Button>
      </div>

      <div className="flex items-center px-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLinkClick}
          className="toolbar-button"
          title="Link"
        >
          <FaLink />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onImageClick}
          className="toolbar-button"
          title="Image"
        >
          <FaImage />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCodeBlockClick}
          className="toolbar-button"
          title="Code Block"
        >
          <FaCode />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onTableClick}
          className="toolbar-button"
          title="Insert Table"
        >
          <FaTable />
        </Button>
      </div>
    </div>
  )
}
