/** @jsxImportSource @emotion/react */
import Button from '../components/button';
import firebase, { auth } from '../lib/firebase';
import { setUser, userWithIDExists } from '../lib/db';

const AnonymousLoginButton = () => {
  const avatarStyles = ['lorelei-neutral', 'lorelei', 'notionists', 'notionists-neutral'];

  const generateRandomSeed = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const getRandomStyle = () => {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    return avatarStyles[randomIndex];
  };

  const handleAnonymousLogin = async () => {
    const randomSeed = generateRandomSeed();
    const randomStyle = getRandomStyle();

    auth.signInAnonymously().then(async (cred) => {
      const userExists = await userWithIDExists(cred.user.uid);

      if (!userExists) {
        // Create a new user with the generated avatar seed and style
        await setUser(cred.user.uid, {
          name: cred.user.uid,
          displayName: 'Anonymous',
          about: 'Say something about yourself 😃 or 🔫',
          posts: [],
          readingList: [],
          // Every time a new anonymous user creates an account, the below API will create a randomized PFP for them.
          photo: `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`,
        });
      } else {
        // Check if the user already has a profile picture
        const userData = await getUserData(cred.user.uid);
        
          if (!userData.photo) {
            console.log('Updating profile picture for existing user...');
            await setUser(cred.user.uid, {
          photo: `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`,
        });
        }
      }
    });
  };

  return (
    <Button onClick={handleAnonymousLogin}>Anonymous 🤿</Button>
  );
};

export default AnonymousLoginButton;
