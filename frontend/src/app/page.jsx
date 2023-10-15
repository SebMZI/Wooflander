'use client'

import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
  
  return (
    <main className={styles.main}>
      <h1>Wooflander</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      
    </main>
  );
}
