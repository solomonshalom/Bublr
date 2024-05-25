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

const imageUrls = [
  "https://static-lyart.vercel.app/The%20Abyss/The%20Abyss%20-%20Related%20-%201.png",
  "https://static-lyart.vercel.app/The%20Abyss/The%20Abyss%20-%20Related%20-%202.png",
  "https://static-lyart.vercel.app/The%20Abyss/The%20Abyss%20-%20Related%20-%203.png",
  "https://static-lyart.vercel.app/The%20Abyss/The%20Abyss%20-%20Related%20-%204.png",
  "https://static-lyart.vercel.app/The%20Abyss/Abyss%20-%20Related%20-%205.png",
  "https://static-lyart.vercel.app/The%20Abyss/Abyss%20-%20Related%20-%206.png",
  "https://static-lyart.vercel.app/The%20Abyss/Abyss%20-%20related%20-%207.png",
  "https://static-lyart.vercel.app/The%20Abyss/Abyss%20-%20related%20-%209.png",
  "https://static-lyart.vercel.app/The%20Abyss/Abyss%20-%20Related%20-%2011.png"
];

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
        
