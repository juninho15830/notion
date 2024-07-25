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
import { ChangeEvent, useState } from 'react'

export function Editor() {
    const [search, setSearch] = useState('')
    const buttons = [
        {
            icon: "https://www.notion.so/images/blocks/text/en-US.png",
            label: "Text",
            description: "Just start writing with plain text.",
            onClick: () => editor!.chain().focus().toggleHeading({ level: 6 }).run()
        },
        {
            icon: "https://www.notion.so/images/blocks/header.57a7576a.png",
            label: "Heading 1",
            description: "Big section heading",
            onClick: () => editor!.chain().focus().toggleHeading({ level: 1 }).run()
        }
        // Adicione mais botões conforme necessário
    ];

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

    function handleSearch(event: ChangeEvent<HTMLInputElement>){
        const query = event.target.value

        setSearch(query)
    }

    const filteredButtons = search !== ''
        ? buttons.filter(button => button.label.includes(search))
        : buttons

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
                    className=' bg-white p-2  border-gray-300 flex flex-col font-medium leading-none shadow-xl shadow-black/20 rounded-lg overflow-hidden mt-56 border'
                    shouldShow={({ state }) => {
                        const { $from } = state.selection
                        const currentLineText = $from.nodeBefore?.textContent
                        return currentLineText === '/'
                    }}
                >
                    <span className='font-bold mb-4'>Add blocks</span>
                    <input 
                        className='mb-2 rounded-sm outline-none'
                        type="text" 
                        placeholder='Search' 
                        onChange={handleSearch}
                    />

                    {filteredButtons.map((button, index) => (
                        <button
                            key={index}
                            className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-gray-300'
                            onClick={button.onClick}
                        >
                            <img src={button.icon} alt={button.label} className='w-12 border border-gray-600 rounded' />
                            <div className='flex flex-col text-left'>
                                <span className='text-sm'>{button.label}</span>
                                <span className='text-xs text-gray-400'>{button.description}</span>
                            </div>
                        </button>
                    ))}
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