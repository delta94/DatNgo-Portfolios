import React from "react";
import ReactDOM from "react-dom";

import { StyledMenu } from "./components";
import { renderMarkButton, renderBlockButton } from "./renderers";

const HoverMenu = props => {
  const { className, innerRef, editor } = props;
  const root = window.document.getElementById("__next");

  return ReactDOM.createPortal(
    <StyledMenu className={className} innerRef={innerRef}>
      {renderMarkButton("bold", "format_bold", editor)}
      {renderMarkButton("italic", "format_italic", editor)}
      {renderMarkButton("underlined", "format_underlined", editor)}
      {renderMarkButton("code", "code", editor)}
      {renderBlockButton("heading-one", "looks_one", editor)}
      {renderBlockButton("heading-two", "looks_two", editor)}
      {renderBlockButton("block-quote", "format_quote", editor)}
      {renderBlockButton("numbered-list", "format_list_numbered", editor)}
      {renderBlockButton("bulleted-list", "format_list_bulleted", editor)}
    </StyledMenu>,
    root
  );
};

export default HoverMenu;
