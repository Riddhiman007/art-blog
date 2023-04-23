import {
  DOMExportOutput,
  DecoratorNode,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
} from "lexical";
import Image from "next/image";
import React from "react";

export interface ImageProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
  maxWidth: number;
}
export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __width: number; // | "inherit";
  __height: number; //| "inherit";
  __maxWidth?: number;
  __alt?: string;

  getType(): string {
    return "images";
  }
  static clone(node: ImageNode): LexicalNode {
    return new ImageNode(
      node.__src,
      node.__alt,
      node.__width,
      node.__height,
      node.__maxWidth,
      node.__alt
    );
  }
  constructor(
    src: string,
    alt: string,
    width: number,
    height: number,
    maxWidth: number,
    key?: string
  ) {
    super(key);
    this.__src = src;
    this.__alt = alt;
    this.__width = width;
    this.__height = height;
    this.__maxWidth = maxWidth;
  }

  /**
   * Returns an image
   */
  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return (
      <>
        <Image
          src={this.__src}
          alt={this.__alt}
          width={this.__width}
          height={this.__height}
        />
      </>
    );
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const span = document.createElement("span");
    span.setAttribute("class", _config.theme.image);
    return span;
  }
  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = document.createElement("img");
    element.src = this.__src;
    element.height = this.__height;
    element.width = this.__width ? this.__width : this.__maxWidth;
    return { element };
  }
}

export function $createImageNode({ src, alt, width, height, maxWidth }: ImageProps) {
  return new ImageNode(src, alt, width, height, maxWidth);
}
export function $isImageNode(node: LexicalNode): boolean {
  return node instanceof ImageNode;
}
