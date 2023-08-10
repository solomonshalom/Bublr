/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const PostContainer = props => (
  <div
    css={css`
      margin-top: 2rem;
      font-size: 1.125rem;
      line-height: 1.5em;

      font-family: 'Newsreader', serif;

      img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }

      a {
        text-decoration: none;
        color: var(--grey-5);
        border-bottom: 1px dotted var(--grey-3);
      }

      p {
        margin: 1.2rem 0;
      }

      ul,
      ol {
        margin-left: 1.5rem;
      }

      blockquote,
      hr {
        margin: 1.5rem 0;
      }

      h1,
      h2,
      h3 {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        letter-spacing: -0.02em;
        margin: 2rem 0 0.5rem 0;
      }

      h1 {
        font-size: 1.5rem;
      }

      h2 {
        font-size: 1.25rem;
      }

      h3 {
        font-style: italic;
        font-size: 1.15rem;
      }

      blockquote > p {
        font-family: 'Inter', sans-serif;
        padding-left: 1.25rem;
        border-left: 0.15rem solid var(--grey-2);
      }

      pre {
        background: var(--grey-5);
        font-family: monospace;
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;
        overflow: auto;
      }

      code {
        font-size: 0.9rem;
        font-family: 'JetBrains Mono', monospace;

        background: rgba(0, 0, 0, 0.1);
        color: var(--grey-4);
        border-radius: 0.2rem;
        padding: 0.2rem;
      }

      pre code {
        background: none;
        color: var(--grey-2);
        border-radius: 0;
        padding: 0;
      }

      [data-theme='dark'] & {
        pre {
          background: var(--grey-2);
        }
        code {
          background: var(--grey-2);
        }
        pre code {
          background: none;
          color: var(--grey-4);
        }
      }
    `}
    {...props}
  >
    {props.children}
  </div>
)

export default PostContainer
