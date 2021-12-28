import { AssetType, CurrencyType } from "../lib/types";
import { DeleteAsset } from "./deleteAsset";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const OneAsset = ({
  asset,
  currencies,
}: {
  asset: AssetType;
  currencies: CurrencyType[];
}) => {
  const priceUSD = currencies.filter(
    (oneCurrency) => oneCurrency.name === asset.type.name
  )[0].priceUSD;

  return (
    <div className="mt-6 bg-white p-6 rounded-md text-gray-500 shadow-lg flex justify-between">
      <p>
        {asset.amount} {asset.type.name}
      </p>
      <p>
        {formatter.format(priceUSD)} / {asset.type.name}
      </p>
      <p>{formatter.format(asset.amount * priceUSD)} total</p>
      <DeleteAsset asset={asset} />
    </div>
  );
};
