/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Header = props => (
  <header
    css={css`
      display: flex;
      margin-bottom: 3.5rem;
      margin-right: 4rem;
      display: -webkit-box;

      a:first-of-type {
        margin-left: auto;
      }

      a {
        display: block;
        text-decoration: none;
      }

      a,
      button {
        color: var(--grey-2);
        cursor: pointer;
        margin-right: 1.5rem;
        transition: all 200ms ease;
      }

      a:hover {
        color: var(--grey-3);
      }

      button:hover {
        color: #402745;
      }

      button:last-of-type {
        margin-right: 0;
      }

      button {
        border: none;
        padding: 0;
        background: none;
      }
    `}
    {...props}
  >
    {props.children}
  </header>
)

export default Header
