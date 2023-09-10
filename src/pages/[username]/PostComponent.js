// Remove the existing getStaticPaths function in the pages directory

// Add a new generateStaticParams function in the app directory
export async function generateStaticParams() {
  return {
    dynamicParams: true, // Set this to true if you had fallback: true in the pages directory, otherwise set it to false
    paths: [
      // Add your paths here
      { params: { id: 1 } },
      { params: { id: 2 } }
    ]
  };
}

// Update the getStaticProps function to use the new generateStaticParams function
export async function getStaticProps({ params }) {
  // Your existing code here
}

// Remove the existing getStaticPaths function in the app directory

// Add the dynamicParams key to the return value of getStaticProps
export async function getStaticProps({ params }) {
  return {
    props: {
      dynamicParams: true // Set this to true if you had fallback: true in the pages directory, otherwise set it to false
    }
  };
}
