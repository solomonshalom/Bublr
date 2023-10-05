import { useEffect, useState } from 'react'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const inputStyles = css`
  display: block;
  width: 100%;
  padding: 0.75em 1em 0.75em 2.5em;
  background: none;
  border: 1px solid var(--grey-2);
  outline: none;
  border-radius: 0.5rem;

  color: var(--grey-4);
  &::placeholder {
    color: var(--grey-3);
  }
`

export default function Search({ posts, isGlobalSearch, getSearchInput, getFilteredPosts }) {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (posts) {
        filterPosts();
        getSearchInput(searchInput);
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchInput, posts, getSearchInput])

  const filterPosts = () => {
    if (isGlobalSearch) {
      console.log('Do global search')
    } else {
      let tempPosts = posts.filter(p => p.title.toLowerCase().includes(searchInput.toLowerCase()))
      getFilteredPosts(tempPosts);
    }
  }

  return (
    <div css={css`
      width: 80%;
    `}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" fill="none" stroke-width="1.5" viewBox="0 0 24 24" color="#ffffff"css={css`
          position: absolute;
          margin: 0.8em
        `}><path stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m17 17 4 4M3 11a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z"></path>
      </svg>
      <input
        id="search-posts"
        type="text"
        placeholder="Search your posts..."
        css={css`${inputStyles}`}
        onChange={e => {
          setSearchInput(e.target.value);
        }}
      />
    </div>
  )
}