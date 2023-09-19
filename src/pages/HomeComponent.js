'use client'
/** @jsxImportSource @emotion/react */
import Head from 'next/head'
import { css } from '@emotion/react'
import { useAuthState } from 'react-firebase-hooks/auth'

import firebase, { auth } from '../lib/firebase'
import { setUser, userWithIDExists } from '../lib/db'

import meta from '../components/meta'
import Spinner from '../components/spinner'
import Container from '../components/container'
import Button, { LinkButton } from '../components/button'

export default function HomeComponent() {
  const [user, loading, error] = useAuthState(auth)

  if (error) {
    return (
      <>
        <p>Oop, we&apos;ve had an error:</p>
        <pre>{JSON.stringify(error)}</pre>
      </>
    )
  }

  return (
    <div>
      <div
css={css`
                margin-top: 0rem;
                margin-bottom: 0.2rem;
                position: relative;
                right: 1rem;

                @media (max-width: 500px) {
                    margin-bottom: 1rem;
                }

              width: 120px;
              height: 120px;

              background-image: url('/images/logo.png');
              background-position: center;
              background-repeat: no-repeat;
              background-size: contain;
`}
      ></div>
      <h1
        css={css`
          font-size: 1.5rem;
          letter-spacing: -0.02rem;
          margin-bottom: 1.5rem;
        `}
      >
        The Abyss
      </h1>
      <ul
        css={css`
          list-style: none;
          color: var(--grey-3);
          margin-bottom: 2.5rem;

          li {
            margin: 0.75rem 0;
          }

          li::before {
            display: inline-block;
            content: '';
            font-size: 0.9rem;
            margin-right: 0.5rem;
          }
        `}
      >
        <li>Express Yourself without Limitations</li>
        <li>A Sanctuary for Unconscious Expression</li>
        <li>A Fusion of Expression and Art</li>
      </ul>
      {loading ? (
        <Button>
          <Spinner />
        </Button>
      ) : user ? (
        <div
          css={css`
            display: flex;
          `}
        >
          <LinkButton href="/dashboard">Dashboard 🕹️</LinkButton>
          <Button
            css={css`
              margin-left: 1rem;
            `}
            outline
            onClick={() => auth.signOut()}
          >
            Sign Out 🚪🚶
          </Button>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            button:first-of-type {
              margin-right: 1rem;
            }
          `}
        >
          <Button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
              auth.signInWithPopup(googleAuthProvider).then(async cred => {
                let userExists = await userWithIDExists(cred.user.uid)
                
                if (!userExists) {
                  await setUser(cred.user.uid, {
                    name: cred.user.uid,
                    displayName: cred.user.displayName || 'Anonymous',
                    about: 'Say something about yourself 😃 or 🔫',
                    posts: [],
                    photo: cred.user.photoURL,
                    readingList: [],
                  })
                }
              })
            }}
          >
            User ⛹️
          </Button>
          <Button
            onClick={() => {
              auth.signInAnonymously().then(async cred => {
                let userExists = await userWithIDExists(cred.user.uid);
                
                if (!userExists) {
                  await setUser(cred.user.uid, {
                    name: cred.user.uid,
                    displayName: 'Anonymous',
                    about: 'Say something about yourself 😃 or 🔫',
                    posts: [],
                    readingList: [],
                  });
                }
              });
            }}
          >
            Anonymous 🤿
          </Button>
        </div>
      )}
    </div>
  )
}

HomeComponent.getLayout = function HomeComponentLayout(page) {
  return (
    <Container maxWidth="420px">
      <Helmet>
  <title>The Abyss</title>
  <meta name="description" content="The Abyss" />
  <meta property="og:title" content="The Abyss" />
  <meta property="og:description" content="The Abyss" />
  <meta property="og:url" content="/" />
  <meta property="og:image" content="/images/socials.jpg" />
  {/* Umami Tag */}
  <script
    async
    src="https://analytics.umami.is/script.js"
    data-website-id="2d7b6782-4c2d-4766-9c26-d0f02c7742f9"
  ></script>
</Helmet>
      {page}
    </Container>
  )
}
