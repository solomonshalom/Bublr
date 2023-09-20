import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from 'react'
import Input from "./input";

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const inputStyles = css`
  display: block;
  width: 17em;
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
    <div>
      <BiSearch css={css`
        position: absolute;
        margin: 0.9em
      `}/>
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