import { HomePage } from "@/src/components/home-page";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DreamTales</title>
        <link rel="icon" href="/docs/design/logo/cloudBlueText.svg" />
      </Head>

     <HomePage />
      
    </div>
  );
}
