// Those sweet writer links for them to share it to the world <3

/** @jsxImportSource @emotion/react */
import Head from 'next/head'
import tinykeys from 'tinykeys'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import router, { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import {
  ArrowLeftIcon,
  Cross2Icon,
  DotsVerticalIcon,
  FontBoldIcon,
  FontItalicIcon,
  Link2Icon,
  LinkBreak2Icon,
  StrikethroughIcon,
} from '@radix-ui/react-icons'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'

import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'

import * as Dialog from '@radix-ui/react-dialog'

import firebase, { auth, firestore } from '../../lib/firebase'
import { postWithUserIDAndSlugExists, removePostForUser } from '../../lib/db'

import Input from '../../components/input'
import Spinner from '../../components/spinner'
import Container from '../../components/container'
import ModalOverlay from '../../components/modal-overlay'
import PostContainer from '../../components/post-container'
import Button, { IconButton, LinkIconButton } from '../../components/button'

function SelectionMenu({ editor }: { editor: any }) {
  const [editingLink, setEditingLink] = useState(false)
  const [url, setUrl] = useState('')

  return (
    <BubbleMenu
      editor={editor}
      css={css`
        display: flex;
        align-items: center;

        border-radius: 0.5rem;
        box-shadow: 0 1rem 1rem var(--grey-1);
        background: var(--grey-5);
        color: var(--grey-1);
        padding: 0.5rem;

        input {
          background: none;
          border: none;
          margin: 0;
          padding: 0.5rem;
          color: var(--grey-2);
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
        }

        input::placeholder {
          font-family: 'Inter', sans-serif;
          color: var(--grey-3);
          font-size: 0.8rem;
        }

        input:focus {
          outline: none;
        }

        button {
          margin: 0 0.5rem;
          background: none;
          border: none;
