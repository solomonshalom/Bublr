/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { htmlToText } from 'html-to-text';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { createPostForUser } from '../../lib/db';
import { firestore, auth } from '../../lib/firebase';
import Button from '../../components/button';
import Header from '../../components/header';
import Spinner from '../../components/spinner';
import Container from '../../components/container';
import Search from '../../components/search';
import ProfileSettingsModal from '../../components/profile-settings-modal';
import { FiCommand } from 'react-icons/fi';
import { useKmenu } from 'kmenu';

function formatDate(date) {
  const year = date.getFullYear();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}

export default function Dashboard() {
  const router = useRouter();

  const [user, userLoading, userError] = useAuthState(auth);
  const [posts, postsLoading, postsError] = useCollectionData(
    firestore.collection('posts').where('author', '==', user ? user.uid : ''),
    { idField: 'id' },
  );
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    console.log(user, userLoading, userError);
    if (!user && !userLoading && !userError) {
      router.push('/');
      return;
    }
  }, [router, user, userLoading, userError]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const getFilteredPosts = (fp) => {
    setFilteredPosts(fp);
  };

  const getSearchInput = (searchInput) => {
    return searchInput;
  };

  return (
    <>
      <Header>
        <button onClick={toggle}>
          <FiCommand />
        </button>
      </Header>

      {userError || postsError ? (
        <>
          <p>Oop, we&apos;ve had an error:</p>
          <pre>{JSON.stringify(error)}</pre>
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
            {/* Rest of your code */}
          </div>

          {/* Rest of your code */}
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
