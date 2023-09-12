// app/generateStaticParams.js
export async function generateStaticParams() {
  return {
    dynamicParams: true, // Set this to true or false based on your previous fallback value
    paths: [
      { params: { id: 1 } },
      { params: { id: 2 } }
    ]
  };
}

// pages/posts/[id].js
import { generateStaticParams } from '../app/generateStaticParams';

export async function getStaticPaths() {
  return generateStaticParams();
}

// Rest of the code remains the same...
