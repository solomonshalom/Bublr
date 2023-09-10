/** @jsxImportSource @emotion/react */
import { css, CSSObject } from '@emotion/react'

const inputStyles: CSSObject = css`
  display: block;
  width: 17em;
  padding: 0.75em 1.5em;
  background: none;
  border: 1px solid var(--grey-2);
  outline: none;
  border-radius: 0.5rem;

  color: var(--grey-4);
  &::placeholder {
    color: var(--grey-3);
  }
`

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = props => (
  <input
    {...props}
    css={css`
      ${inputStyles}
    `}
  />
)

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = props => (
  <textarea
    {...props}
    css={css`
      ${inputStyles}
      min-height: 15em;
      resize: vertical;
      padding-top: 1em;
    `}
  />
)

export default Input