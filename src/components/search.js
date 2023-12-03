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

export default function Search(props) {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (props.posts) {
        filterPosts();
        props.getSearchInput(searchInput);
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchInput])

  const filterPosts = () => {
    if (props.isGlobalSearch) {
      console.log('Do global search')
    } else {
      let tempPosts = props.posts.filter(p => p.title.toLowerCase().includes(searchInput.toLowerCase()))
      props.getFilteredPosts(tempPosts);
    }
    
  }

  return (
    <div css={css`
      width: 80%;
    `}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" fill="none" stroke-width="1.5" viewBox="0 0 24 24" color="#ffffff"css={css`
          position: absolute;
          margin: 0.8em;
          path {
          stroke: black;
          }

          @media (prefers-color-scheme: dark) {
          path {
          stroke: white;
          }
        }
        `}
        >
        <path stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m17 17 4 4M3 11a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z"></path>
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
