"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TiptapEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-slate-200 p-2 flex gap-1 flex-wrap">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive('bold') ? 'bg-slate-200' : ''
        )}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive('italic') ? 'bg-slate-200' : ''
        )}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive('strike') ? 'bg-slate-200' : ''
        )}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive('code') ? 'bg-slate-200' : ''
        )}
      >
        <Code className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-slate-300 mx-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive('bulletList') ? 'bg-slate-200' : ''
        )}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive('orderedList') ? 'bg-slate-200' : ''
        )}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          "h-8 w-8 p-0",
          editor.isActive('blockquote') ? 'bg-slate-200' : ''
        )}
      >
        <Quote className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function TiptapEditor({ value = '', onChange, placeholder, className }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'max-w-none focus:outline-none p-4 gap-0 flex flex-col min-h-[200px]',
      },
    },
  })

  return (
    <div className={cn("border border-slate-300 rounded-md bg-white", className)}>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="min-h-[200px]"
        placeholder={placeholder}
      />
    </div>
  )
}
