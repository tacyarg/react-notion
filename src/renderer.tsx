import React from "react";
import { BlockMapType } from "./types";
import { Block } from "./block";

interface NotionRendererProps {
  blockMap: BlockMapType;
  currentId?: string;
  level?: number;
}

export const NotionRenderer: React.FC<NotionRendererProps> = ({
  level = 0,
    currentId,
  blockMap,
  ...p
}) => {
  const id = currentId || Object.keys(blockMap)[0];
  const currentBlock = blockMap[id];
  const parentBlock = blockMap[currentBlock.value.parent_id];

  return (
    <Block
      key={id}
      level={level}
      block={currentBlock}
      parentBlock={parentBlock}
      {...p}
    >
      {currentBlock?.value?.content?.map(contentId => (
        <NotionRenderer
          {...p}
          key={contentId}
          currentId={contentId}
          blockMap={blockMap}
          level={level + 1}
        />
      ))}
    </Block>
  );
};
