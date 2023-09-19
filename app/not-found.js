/** @jsxImportSource @emotion/react */
import { Helmet } from 'react-helmet'
import { css } from '@emotion/react'

import Container from '../src/components/container'

export default function NotFound() {
  return (
    <Container maxWidth="640px">
      <Helmet>
  <title>Not Found</title>
</Helmet>
      <h1>404</h1>
      <p
        css={css`
          margin-top: 1.5rem;
        `}
      >
        Looks like we can&apos;t find what you were looking for 😓
      </p>
    </Container>
  )
}