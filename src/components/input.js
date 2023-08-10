/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const inputStyles = css`
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

const Input = props => (
  <input
    {...props}
    css={css`
      ${inputStyles}
    `}
  />
)

export const Textarea = props => (
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
