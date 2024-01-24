/** @jsxImportSource @emotion/react */
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { htmlToText } from 'html-to-text'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { createPostForUser } from '../../lib/db'
import { firestore, auth } from '../../lib/firebase'

import Button from '../../components/button'
import Header from '../../components/header'
import Spinner from '../../components/spinner'
import Container from '../../components/container'
import Search from '../../components/search'

import {
  KBar,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
} from "kbar";

function formatDate(date) {
  const year = date.getFullYear()
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('-')
}

export default function Dashboard() {
  const router = useRouter();

  const [user, userLoading, userError] = useAuthState(auth);
  const [posts, postsLoading, postsError] = useCollectionData(
    firestore.collection('posts').where('author', '==', user ? user.uid : ''),
    { idField: 'id' },
  );
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Initialize the useMatches hook
  const { isOpen, open, close } = useMatches();

  useEffect(() => {
    console.log(user, userLoading, userError);
    if (!user && !userLoading && !userError) {
      router.push('/');
      return;
    }
  }, [router, user, userLoading, userError]);

  // Set initial filteredPosts
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // Get the filtered posts from Search component
  const getFilteredPosts = (fp) => {
    setFilteredPosts(fp);
  };

  // Get the searchInput from Search component
  const getSearchInput = (searchInput) => {
    return searchInput;
  };

  return (
    <>
      <Header>
        {/* Kbar menu link */}
        <KBar>
          <KBarPositioner>
            <KBarAnimator>
              <KBarSearch />
            </KBarAnimator>
          </KBarPositioner>
        </KBar>

        {/* Replace individual links with a single menu link */}
        <button
          onClick={() => {
            // Toggle Kbar visibility when the button is clicked
            isOpen ? close() : open();
          }}
        >
          Open Kbar
        </button>
      </Header>

      {userError || postsError ? (
        <>
          <p>Oop, we&apos;ve had an error:</p>
          <pre>{JSON.stringify(userError || postsError)}</pre>
        </>
      ) : user && filteredPosts && posts ? (
        <>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              gap: 1em;
              width: 100%;
            `}
          >
            <Button
              outline
              css={css`
                font-size: 1.3rem;
                padding: 0;
                width: 2.15em;
                height: 2.15em;
              `}
              onClick={async () => {
                const newPostsId = await createPostForUser(user.uid);
                router.push(`/dashboard/${newPostsId}`);
              }}
            >
              {/* Your SVG code here */}
            </Button>

            <Search
              posts={posts}
              isGlobalSearch={false}
              getFilteredPosts={getFilteredPosts}
              getSearchInput={getSearchInput}
              css={css`
                width: 3em;
              `}
            ></Search>

            <Link href="https://bublr.life/solomonlijo/guideofbublr">
              <Button
                outline
                css={css`
                  font-size: 1.3rem;
                  padding: 0;
                  border-radius: 100%;
                  position: fixed;
                  bottom: 2em;
                  right: 2em;
                  width: 2.2em;
                  height: 2.2em;
                  text-align: center;
                `}
              >
                {/* Your SVG code here */}
              </Button>
            </Link>
          </div>
          {posts.length > 0 ? (
            <div>
              {filteredPosts?.length === 0 && getSearchInput().length > 0 ? (
                <p
                  css={css`
                    margin-top: 2rem;
                  `}
                >
                  Yep, nothing matches your search results, I wonder why 🤔
                </p>
              ) : (
                <ul
                  css={css`
                    margin-top: 0rem;
                    list-style: none;
                  `}
                >
                  {[...filteredPosts]
                    .sort(
                      (a, b) =>
                        b.lastEdited.toDate().getTime() -
                        a.lastEdited.toDate().getTime(),
                    )
                    .map((post) => (
                      <li
                        key={post.id}
                        css={css`
                          margin: 2rem 0;
                          display: flex;

                          a {
                            width: 70%;
                            margin-left: auto;
                            display: inline-block;
                            text-decoration: none;
                            color: inherit;
                          }

                          @media (max-width: 720px) {
                            display: block;
                            margin: 2rem 0;

                            a {
                              width: 100%;
                              margin: 0;
                            }

                            p {
                              margin-bottom: 0.75rem;
                            }
                          }
                        `}
                      >
                        {/* Your additional code here */}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ) : (
            <div>
              <p
                css={css`
                  margin-top: 2rem;
                `}
              >
                Welcome to Bublr! 🔥 A Beautiful Place to Free your Mind ✨
              </p>
            </div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

Dashboard.getLayout = function DashboardLayout(page) {
  return (
    <Container
      maxWidth="640px"
      css={css`
        margin-top: 5rem;
      `}
    >
      <Head>
        <title>Dashboard / Bublr</title>
      </Head>
      {page}
    </Container>
  );
};