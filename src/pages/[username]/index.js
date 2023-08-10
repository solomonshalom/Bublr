/** @jsxImportSource @emotion/react */
import Link from 'next/link'
import Head from 'next/head'
import { css } from '@emotion/react'
import { htmlToText } from 'html-to-text'

import { truncate } from '../../lib/utils'
import { getUserByName } from '../../lib/db'

import meta from '../../components/meta'
import Container from '../../components/container'

export default function Profile({ user }) {
  return (
    <Container maxWidth="640px">
      <Head>
        {meta({
          title: `${user.displayName} (@${user.name}) / OSPress`,
          description: user.about,
          url: `/${user.name}`,
          image: user.photo,
        })}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <img
        src={user.photo}
        alt="Profile picture"
        css={css`
          width: 5rem;
          border-radius: 2.5rem;
        `}
      />
      <h1
        css={css`
          font-size: 1.5rem;
          letter-spacing: -0.03em;
          margin: 1.5rem 0 1rem 0;
        `}
      >
        {user.displayName}
      </h1>

      <p
        css={css`
          color: var(--grey-4);
          font-size: 1.125rem;
          font-family: 'Newsreader', serif;
          line-height: 1.5em;
        `}
      >
        {user.about}
      </p>

      <ul
        id="posts"
        css={css`
          list-style: none;
          margin-top: 3rem;
        `}
      >
        {user.posts.map(post => (
          <li
            key={post.id}
            css={css`
              display: flex;
              margin: 2.5rem 0;

              a {
                text-decoration: none;
                color: inherit;
                display: block;
                width: 70%;
                margin-left: auto;
              }

              @media (max-width: 626px) {
                flex-direction: column;

                a {
                  width: 100%;
                }
              }
            `}
          >
            <p
              css={css`
                margin: 0.75rem 0;
                font-size: 0.9rem;
                color: var(--grey-3);
                margin: 0 auto auto 0;

                @media (max-width: 626px) {
                  margin-bottom: 1rem;
                }
              `}
            >
              {new Date(post.lastEdited).toDateString()}
            </p>

            <Link href={`/${user.name}/${post.slug}`}>
              <a>
                <h3
                  css={css`
                    font-size: 1rem;
                    font-weight: 400;
                    margin-bottom: 0.6rem;
                  `}
                >
                  {post.title ? htmlToText(post.title) : 'Untitled'}
                </h3>

                <p
                  css={css`
                    max-width: 25rem;
                    color: var(--grey-4);
                    font-family: 'Newsreader', serif;
                    line-height: 1.5em;
                  `}
                >
                  {post.excerpt
                    ? htmlToText(post.excerpt)
                    : truncate(htmlToText(post.content), 25)}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { username } = params

  try {
    const user = await getUserByName(username)
    user.posts = user.posts.map(p => ({
      ...p,
      lastEdited: p.lastEdited.toDate().getTime(),
    }))
    user.posts.sort((a, b) => {
      return b.lastEdited - a.lastEdited
    })
    user.posts = user.posts.filter(p => p.published)
    return {
      props: { user },
      revalidate: 1,
    }
  } catch (err) {
    console.log(err)
    return { notFound: true }
  }
}
