'use client'
// InitializedMDXEditor.tsx
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  MDXEditor,
  UndoRedo,
  BlockTypeSelect,
  KitchenSinkToolbar,
  BoldItalicUnderlineToggles,
  type MDXEditorMethods,
  type MDXEditorProps
} from '@mdxeditor/editor'

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarClassName: "flex flex-row gap-2",
          toolbarContents(){
            return <div className='rounded-none '>
            <UndoRedo/>
            <BoldItalicUnderlineToggles/>
            {/* <KitchenSinkToolbar/> */}
            {/* <BlockTypeSelect/> */}
            </div>
          }
        })
      ]}
      {...props}
      ref={editorRef}
    />
  )
}
