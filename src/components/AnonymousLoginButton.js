import React from 'react';
import { Button } from 'your-ui-library'; // Replace 'your-ui-library' with your actual UI library
import { auth } from 'firebase'; // Import your authentication library
import { userWithIDExists, setUser } from 'your-database-functions'; // Replace with your actual database functions

const AnonymousLoginButton = () => {
  const generateRandomSeed = () => {
    // Generate a random seed here
    return Math.floor(Math.random() * 1000000).toString();
  };

  const handleAnonymousLogin = async () => {
    const randomSeed = generateRandomSeed();

    auth.signInAnonymously().then(async (cred) => {
      const userExists = await userWithIDExists(cred.user.uid);

      if (!userExists) {
        // Create a new user with the generated avatar seed
        await setUser(cred.user.uid, {
          name: cred.user.uid,
          displayName: 'Anonymous',
          about: 'Say something about yourself 😃 or 🔫',
          posts: [],
          readingList: [],
          photo: `https://api.dicebear.com/7.x/lorelei/svg?seed=${randomSeed}`, // Include the random seed in the URL
        });
      }
    });
  };

  return (
    <Button onClick={handleAnonymousLogin}>Anonymous 🤿</Button>
  );
};

export default AnonymousLoginButton;
