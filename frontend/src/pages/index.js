import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import dogVideo from "../../public/dog.mp4";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>WoofLander - Home</title>
        <meta
          name="description"
          content="WoofLander is a dogSitting platform. Find the best match for your furry dog!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="home-main">
        <section className="hero-section">
          <video autoPlay loop muted playsInline>
            <source src={dogVideo} type="video/mp4"></source>
          </video>
          <div className="content">
            <h2 className="hero-title">
              Find the Perfect <span className="text-or">Dog</span>sitter for
              Your Furry Friend !
            </h2>
            <p className="hero-subtitle owner">
              <span className="text-or">Free</span> for the owners !
            </p>
            <p className="hero-subtitle sitter">9,99€/month for the sitters.</p>
            <p className="hero-subtitle">Trusted by + 5000 owners</p>
          </div>
          <div className="overlay"></div>
        </section>
      </main>
    </>
  );
}
