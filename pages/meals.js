import Head from "next/head";
import FooterMenu from "../components/FooterMenu";

export default function Meals({}) {
  return (
    <>
      <Head>
        <title>Meals</title>
      </Head>
      <div className="meals">
        <h1>Meals</h1>

        <FooterMenu />
      </div>
    </>
  );
}
