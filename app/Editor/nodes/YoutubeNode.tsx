import {
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";

import { BlockWithAlignableContents } from "@lexical/react/LexicalBlockWithAlignableContents";
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from "@lexical/react/LexicalDecoratorBlockNode";
import React from "react";
import YouTube from "react-youtube";

/**
 * Youtube props for this node
 */
export interface YoutubeProps {
  videoId: string;
  key: NodeKey;
  className: Readonly<{ base: string; focus: string }>;
  format: ElementFormatType;
}

/**
 *
 * @param {YoutubeProps} param0
 * @returns A component for representing youtube video
 */
export function YoutubeComponent({ videoId, className, format, key }: YoutubeProps) {
  return (
    <BlockWithAlignableContents nodeKey={key} className={className} format={format}>
      <iframe
        width="320"
        height="220"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="YouTube video"
      />
    </BlockWithAlignableContents>
  );
}

export type SerializedYouTubeNode = Spread<
  {
    videoId: string;
    type: "youtube";
    version: 1;
  },
  SerializedDecoratorBlockNode
>;

export default class YoutubeNode extends DecoratorBlockNode {
  __videoId: string;

  constructor(videoId: string, key?: NodeKey, format?: ElementFormatType) {
    super(format, key);
    this.__videoId = videoId;
  }

  static clone(node: YoutubeNode): LexicalNode {
    return new YoutubeNode(node.__videoId, node.__key, node.__format);
  }

  static getType(): string {
    return "youtube";
  }

  updateDOM(): false {
    return false;
  }

  getVideoId(): string {
    return this.__videoId;
  }

  getTextContent(
    _inclueInsert?: boolean | undefined,
    _includeDirectionless?: false | undefined
  ): string {
    return `www.youtube.com/watch?v=${this.__videoId}`;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const video = document.createElement("iframe");
    video.src = this.__videoId;
    video.className = this.__iframeClassName;

    return { element: video };
  }

  static importJSON(_serializedNode: SerializedYouTubeNode): LexicalNode {
    const node = $createYoutubeNode(_serializedNode.videoId);
    node.setFormat(_serializedNode.format);
    return node;
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      ...super.exportJSON(),
      type: "youtube",
      version: 1,
      videoId: this.__videoId,
    };
  }
  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || "",
      focus: embedBlockTheme.focus || "",
    };
    return (
      <YoutubeComponent
        className={className}
        format={this.__format}
        key={this.getKey()}
        videoId={this.__videoId}
      />
    );
  }

  isInline(): boolean {
    return false;
  }
}

export function $createYoutubeNode(videoId: string) {
  return new YoutubeNode(videoId);
}

export function $isYoutubeNode(node: LexicalNode): boolean {
  return node instanceof YoutubeNode;
}
