import { Node } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export const Placeholder = Node.create({
  name: 'placeholder',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('placeholder'),
        props: {
          decorations: ({ doc, selection }) => {
            const decorations: Decoration[] = []
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cursorPosition = (selection as any).$cursor?.pos

            doc.descendants((node, pos) => {
              if (node.type.isBlock && !node.childCount && pos !== cursorPosition) {
                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: 'is-empty',
                  'data-placeholder': 'Type/for blocks, @to link docs or people',
                })
                decorations.push(decoration)
              }

              return true
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})