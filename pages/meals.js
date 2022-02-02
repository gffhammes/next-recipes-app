import Head from "next/head";
import FooterMenu from "../components/FooterMenu";

export default function Meals({}) {
  return (
    <>
      <Head>
        <title>Meals</title>
      </Head>
      <div className="meals">
        <div id="page__title">
          <h1>Meals</h1>
        </div>
        <div className="meals">
          
        </div>
        <FooterMenu />
      </div>
    </>
  );
}
