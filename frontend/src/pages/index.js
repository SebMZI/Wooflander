import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import dogVideo from "../../public/dog.webm";
import Link from "next/link";

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
            <p className="hero-subtitle sitter">
              Only 9,99€/month for the sitters.
            </p>
            <p className="hero-subtitle">Trusted by more than 5000 owners.</p>

            <div className="btn-container">
              <button className="btn btn-solid">
                <Link href="/auth/signup">Signup</Link>
              </button>
              <button className="btn btn-light">
                <Link href="/auth/login">Login</Link>
              </button>
            </div>
            <div className="hero-tcu">
              Take a look at the{" "}
              <span>
                <Link href="/tcu">
                  Terms and Conditions of Use for Wooflander
                </Link>
              </span>
            </div>
          </div>

          <div className="overlay"></div>
        </section>
      </main>
    </>
  );
}
