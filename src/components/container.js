/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Container = props => {
  const { maxWidth, ...otherProps } = props
  return (
    <main
      css={css`
        max-width: ${maxWidth};
        margin: 10rem auto 0 auto;

        @media (max-width: 720px) {
          margin: 5rem auto 0 auto;
          width: 85%;
        }

        @media (max-width: 325px) {
          width: 90%;
        }
      `}
      {...otherProps}
    >
      {props.children}
    </main>
  )
}

export default Container
