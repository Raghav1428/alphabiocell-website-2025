import SmoothScrollProvider from "./components/SmoothScrollProvider";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import { Events } from "./components/Events";
import { Research } from "./components/Research";
import { Board } from "./components/Board";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScrollProvider>
        <main id="main">
          <Navbar />
          <Hero />
          <Marquee />
          <Events />
          <Research />
          <Board />
        </main>
      </SmoothScrollProvider>
    </>
  );
}
