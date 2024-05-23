/** @jsxImportSource @emotion/react */
import Head from 'next/head'
import { css } from '@emotion/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import AnonymousLoginButton from '../components/AnonymousLoginButton';

import firebase, { auth } from '../lib/firebase'
import { setUser, userWithIDExists } from '../lib/db'

import meta from '../components/meta'
import Spinner from '../components/spinner'
import Container from '../components/container'
import Button, { LinkButton } from '../components/button'

export default function Home() {
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
          margin-bottom: 1rem;
          position: relative;
          right: 1rem;

          @media (max-width: 500px) {
            margin-bottom: 1rem;
          }

          width: 120px;
          height: 120px;

          background-image: url('/images/logo-2.png');
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
        Bublr
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
        <li>A Digital Garden for your Thoughts</li>
        <li>Meet other like-minded People</li>
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
          <AnonymousLoginButton />
        </div>
      )}
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 300px;
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img src="https://via.placeholder.com/60" alt="Icon 1" css={getRandomPositionStyle()} />
        <img src="https://via.placeholder.com/60" alt="Icon 2" css={getRandomPositionStyle()} />
        <img src="https://via.placeholder.com/60" alt="Icon 3" css={getRandomPositionStyle()} />
        <img src="https://via.placeholder.com/60" alt="Icon 4" css={getRandomPositionStyle()} />
        <img src="https://via.placeholder.com/60" alt="Icon 5" css={getRandomPositionStyle()} />
        <img src="https://via.placeholder.com/60" alt="Icon 6" css={getRandomPositionStyle()} />
        <img src="https://via.placeholder.com/60" alt="Icon 7" css={getRandomPositionStyle()} />
        <img src="https://via.placeholder.com/60" alt="Icon 8" css={getRandomPositionStyle()} />
      </div>
    </div>
  )
}

const getRandomPositionStyle = () => {
  const randomTop = Math.floor(Math.random() * 100) + 'px';
  const randomLeft = Math.floor(Math.random() * 100) + 'px';
  const randomZIndex = Math.floor(Math.random() * 10);
  return css`
    position: absolute;
    top: ${randomTop};
    left: ${randomLeft};
    z-index: ${randomZIndex};
    width: 60px;
    height: 60px;
    border-radius: 8px;
    background-color: #f0f0f0; /* Placeholder background */
  `;
};

Home.getLayout = function HomeLayout(page) {
  return (
    <Container maxWidth="420px">
      <Head>
        {meta({
          title: 'Bublr',
          description:
            'An ultra-minimal platform to let your thoughts out~',
          url: '/',
          image: '/images/socials.jpg',
        })}
      </Head>
      {page}
    </Container>
  )
}
