import { AssetType, CurrencyType } from "../lib/types";
import { OneAsset } from "./oneAsset";

export const AssetList = ({
  assets,
  currencies,
}: {
  assets: AssetType[];
  currencies: CurrencyType[];
}) => {
  if (!assets || assets.length === 0) {
    return (
      <div>
        <p>No assets, why not add some?</p>
      </div>
    );
  }

  return (
    <div>
      {assets.map((oneAsset) => (
        <OneAsset
          asset={oneAsset}
          key={`asset-${oneAsset.id}`}
          currencies={currencies}
        />
      ))}
    </div>
  );
};
