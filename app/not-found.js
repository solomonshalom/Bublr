/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NextSeo } from 'next-seo';

import Container from '../src/components/container';

export default function NotFound() {
  return (
    <Container maxWidth="640px">
      <NextSeo title="Not Found" />
      <h1>404</h1>
      <p
        css={css`
          margin-top: 1.5rem;
        `}
      >
        Looks like we can't find what you were looking for 😓
      </p>
    </Container>
  );
}