// const componentMap = {
//   'core/quote': QuoteBlock,
//   'core/pullquote': PullquoteBlock,
//   'core/code': CodeBlock,
//   'core/preformatted': PreformattedBlock,
//   'core/embed': EmbedBlock,
//   'core/media-text': MediaTextBlock,
//   'core/button': ButtonBlock,
//   'core/buttons': ButtonsBlock,
//   'core/columns': ColumnsBlock,
//   'core/cover': CoverBlock,
//   'core/heading': HeadingBlock,
//   'core/image': ImageBlock,
//   'core/gallery': GalleryBlock,
//   'core/table': TableBlock,
//   'core/list': ListBlock,
//   'core/paragraph': ParagraphBlock,
//   'core/separator': SeparatorBlock,
//   'core/spacer': SpacerBlock,
// };
//
// export default function Block({ block }) {
//   const { attributes, name, innerBlocks } = block;
//   const BlockComponent = componentMap[name];
//
//   if (!BlockComponent) {
//     return null;
//   }
//
//   if (innerBlocks) {
//     return <BlockComponent attributes={attributes} innerBlocks={innerBlocks} />;
//   }
//
//   return <BlockComponent {...attributes} />;
// }
