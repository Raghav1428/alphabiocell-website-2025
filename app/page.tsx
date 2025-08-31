// app/page.tsx
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScrollProvider>
        <main id="main">
          <Navbar />
          <Hero />
          <Marquee />
        </main>
      </SmoothScrollProvider>
    </>
  );
}
