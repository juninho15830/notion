import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder }from './Placeholder'
import { InitialContent } from './InitialContent'
import {
    RxFontBold,
    RxFontItalic,
    RxStrikethrough,
    RxCode,
    RxChevronDown,
    RxChatBubble
} from 'react-icons/rx'
import { BubbleButton } from './BubbleButton'

export function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder,
        ],
        content: InitialContent,
        editorProps: {
            attributes: {
                class: 'outline-none',
            },
        },
    })

    return (
        <>
            <div
                className="relative mx-auto pt-12 max-w-[720px] h-[60vh]"
                onClick={() => editor?.view.focus()}
            >
                <EditorContent
                    className="prose-h1:text-3xl prose-h1:font-bold"
                    editor={editor}
                />
                {!editor?.getText() && (
                    <div className="absolute top-12 left-0 w-full h-full flex items-start text-gray-400 pointer-events-none">
                        Type/for blocks, @to link docs or people
                    </div>
                )}
            </div>
            {editor && (
                <FloatingMenu
                    editor={editor}
                    className=' bg-white py-2 px-1  border-gray-600 flex flex-col font-medium leading-none shadow-xl shadow-black/20 rounded-lg overflow-hidden mt-36'
                    shouldShow={({ state }) => {
                        const { $from } = state.selection
                        const currentLineText = $from.nodeBefore?.textContent
                        return currentLineText === '/'
                    }}
                >
                    <button className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-gray-300' onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>
                        <img src="https://www.notion.so/images/blocks/text/en-US.png" alt="Text" className='w-12 border border-gray-600 rounded' />
                        <div className='flex flex-col text-left'>
                            <span className='text-sm'>Text</span>
                            <span className='text-xs text-gray-400'>Just start writing with plain text.</span>
                        </div>
                    </button>
                    <button className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-gray-300' onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                        <img src="https://www.notion.so/images/blocks/header.57a7576a.png" alt="Heading" className='w-12 border border-gray-600 rounded' />
                        <div className='flex flex-col text-left'>
                            <span className='text-sm'>Heading 1</span>
                            <span className='text-xs text-gray-400'>Big section heading</span>
                        </div>
                    </button>
                </FloatingMenu>
            )}
            {editor && (
                <BubbleMenu
                    className=' bg-white border-gray-600 flex font-medium leading-none shadow-xl shadow-black/20 rounded-lg overflow-hidden divide-x divide-gray-500'
                    editor={editor}
                >
                    <BubbleButton>
                        Text
                        <RxChevronDown />
                    </BubbleButton>
                    <BubbleButton>
                        Comment
                        <RxChatBubble />
                    </BubbleButton>
                    <div className='flex items-center'>
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            data-active={editor.isActive('bold')}
                        >
                            <RxFontBold />
                        </BubbleButton>
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            data-active={editor.isActive('italic')}
                        >
                            <RxFontItalic />
                        </BubbleButton>
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            data-active={editor.isActive('strike')}
                        >
                            <RxStrikethrough />
                        </BubbleButton>
                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            data-active={editor.isActive('code')}
                        >
                            <RxCode />
                        </BubbleButton>
                    </div>
                </BubbleMenu>
            )}
        </>
    )
}