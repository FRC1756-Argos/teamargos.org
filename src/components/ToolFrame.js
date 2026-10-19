import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

// Embeds a standalone interactive tool from static/tools/ so it fills the screen below the navbar.
// The tools are plain HTML pages; they read this page's light/dark mode and follow it when it changes.
export default function ToolFrame({src, title}) {
  return (
    <iframe
      src={useBaseUrl(src)}
      title={title}
      style={{
        display: 'block',
        width: '100%',
        height: 'calc(100vh - var(--ifm-navbar-height))',
        border: 0,
      }}
    />
  );
}
