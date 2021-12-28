import prisma from "../lib/prisma";
import Head from "next/head";
import { AssetList } from "../components/assetList";
import { CreateAsset } from "../components/createAsset";
import { setCurrencyData } from "../lib/cmcData";
import { AssetType, CurrencyType } from "../lib/types";
import { Footer } from "../components/footer";

export default function Home({
  assets,
  currencies,
}: {
  assets: AssetType[];
  currencies: CurrencyType[];
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Noted: a cryptocurrency tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow">
        <div className="p-2">
          <div className="flex flex-row p-2">
            <img className="w-20 h-auto" src="./logo.png" />
            <h1 className="text-3xl pl-3 pb-3 pt-6 pb-6">
              Noted: a cryptocurrency tracker
            </h1>
          </div>
          <CreateAsset currencies={currencies} />
          <AssetList assets={assets} currencies={currencies} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async ({}) => {
  const assets = await prisma.asset.findMany({ include: { type: true } });
  const currencies = await setCurrencyData(prisma);

  return { props: { assets, currencies: currencies } };
};
