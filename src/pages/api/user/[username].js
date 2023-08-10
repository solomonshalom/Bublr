import { getUserByName } from '../../../lib/db'

export default async function getUser(req, res) {
  const { username } = req.query

  if (!username || Array.isArray(username)) {
    res.status(400).json({ message: 'Username must be provided.' })
  }

  try {
    const user = await getUserByName(username)
    res.status(200).json(user)
  } catch (err) {
    if (err.code === 'user/not-found') {
      res
        .status(404)
        .json({ message: 'A user with that name could not be found.' })
    } else {
      res.status(500).json({ message: 'Internal error.' + err })
    }
  }
}
