import ReactGA from 'react-ga4';
import Meta from "../components/SEO/Meta";

function App({ Component, pageProps }) {
  // Initialize GA safely
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_TRACKING_ID) {
    try {
      ReactGA.initialize(process.env.NEXT_PUBLIC_TRACKING_ID);
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  )
}

export default App;