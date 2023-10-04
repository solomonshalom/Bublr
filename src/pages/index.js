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

  const logos = ['logo-1.png', 'logo-2.png'];

  // Function to set the logo randomly
  const setRandomLogo = () => {
    const randomLogo = logos[Math.floor(Math.random() * logos.length)];
    const logoDiv = document.getElementById('logo');
    if (logoDiv) {
      logoDiv.style.backgroundImage = `url('/images/${randomLogo}')`;
    }
  };

  // Call the function to set the initial logo when the component is first rendered
  setRandomLogo();

  return (
    <div>
        <div
            id="logo"
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
            `}
        >
          </div>
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
          {/*Implementing an Avater functionality + Makes code much better! Praise, God (Couldn't have done it w/o him <3):D*/}
          <AnonymousLoginButton />
        </div>
      )}
    </div>
  )
}

Home.getLayout = function HomeLayout(page) {
  return (
    <Container maxWidth="420px">
      <Head>
        {meta({
          title: 'The Abyss',
          description:
            'The Abyss',
          url: '/',
          image: '/images/socials.jpg',
        })}
        {/* Umami Tag */}
        <script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id="2d7b6782-4c2d-4766-9c26-d0f02c7742f9"
        ></script>
      </Head>
      {page}
    </Container>
  )
}
