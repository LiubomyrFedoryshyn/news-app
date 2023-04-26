import Head from "next/head";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>News App</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between lg:p-24 ml-2 mt-4  ${inter.className}`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
