import firebase, { firestore } from './firebase'

export async function userWithIDExists(id: string): Promise<boolean> {
  const doc = await firestore.collection('users').doc(id).get()
  return doc.exists
}

export async function userWithNameExists(name: string): Promise<boolean> {
  const query = await firestore
    .collection('users')
    .where('name', '==', name)
    .get()

  return !query.empty
}

export async function getUserByID(id: string): Promise<any> {
  const doc = await firestore.collection('users').doc(id).get()
  if (!doc.exists) {
    throw { code: 'user/not-found' }
  }

  const user = doc.data()
  const postDocPromises = user.posts.map((postId: string) => getPostByID(postId))
  user.posts = await Promise.all(postDocPromises)

  return { id: doc.id, ...user }
}

export async function getUserByName(name: string): Promise<any> {
  const query = await firestore
    .collection('users')
    .where('name', '==', name)
    .get()

  if (query.empty || !query.docs[0].exists) {
    throw { code: 'user/not-found' }
  }

  const user = { id: query.docs[0].id, ...query.docs[0].data() }
  const postDocPromises = user.posts.map((postId: string) => getPostByID(postId))
  user.posts = await Promise.all(postDocPromises)

  return user
}

export async function getPostByID(id: string): Promise<any> {
  const doc = await firestore.collection('posts').doc(id).get()
  if (!doc.exists) {
    throw { code: 'post/not-found' }
  }

  return { id: doc.id, ...doc.data() }
}

export async function removePostForUser(uid: string, pid: string): Promise<void> {
  await firestore.collection('posts').doc(pid).delete()
  firestore
    .collection('users')
    .doc(uid)
    .update({ posts: firebase.firestore.FieldValue.arrayRemove(pid) })
}

export async function postWithIDExists(id: string): Promise<boolean> {
  const doc = await firestore.collection('posts').doc(id).get()
  return doc.exists
}

export async function postWithUsernameAndSlugExists(username: string, slug: string): Promise<any> {
  const user = await getUserByName(username)
  return user.posts.find((post: any) => post.slug === slug)
}

export async function postWithUserIDAndSlugExists(uid: string, slug: string): Promise<any> {
  const user = await getUserByID(uid)
  return user.posts.find((post: any) => post.slug === slug)
}

export async function getPostByUsernameAndSlug(username: string, slug: string): Promise<any> {
  const user = await getUserByName(username)
  const post = user.posts.find((post: any) => post.slug === slug)
  if (!post) {
    throw { code: 'post/not-found' }
  }

  return post
}

export async function setUser(id: string, data: any): Promise<void> {
  await firestore.collection('users').doc(id).set(data)
}

export async function setPost(id: string, data: any): Promise<void> {
  await firestore.collection('posts').doc(id).set(data)
}

export async function createPostForUser(userId: string): Promise<string> {
  const doc = await firestore.collection('posts').add({
    title: '',
    excerpt: '',
    content: '',
    author: userId,
    published: false,
    lastEdited: firebase.firestore.Timestamp.now(),
  })

  await firestore.collection('posts').doc(doc.id).update({ slug: doc.id })

  await firestore
    .collection('users')
    .doc(userId)
    .update({ posts: firebase.firestore.FieldValue.arrayUnion(doc.id) })

  return doc.id
}