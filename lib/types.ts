import { Asset, Currency } from ".prisma/client";

export type CMCCurrencyType = {
  id?: number;
  name?: string;
  symbol: string;
  num_market_pairs?: number;
  date_added?: string;
  tags?: string[];
  max_supply?: number;
  circulating_supply?: number;
  platform?: null;
  cmc_rank?: number;
  last_updated?: string;
  quote: {
    USD: {
      price: number;
      volume_24h?: number;
      volume_change_24h?: number;
      percent_change_1h?: number;
      percent_change_24h?: number;
      percent_change_7d?: number;
      percent_change_30d?: number;
      percent_change_60d?: number;
      percent_change_90d?: number;
      market_cap?: number;
      market_cap_dominance?: number;
      fully_diluted_market_cap?: number;
      last_updated?: string;
    };
  };
};

export type NewAssetState = {
  amount: number | string;
  type?: string;
  currencyId?: number;
};

export interface AssetType extends Asset {
  type: Currency;
}

export interface CurrencyType extends Currency {
  assets: Asset[];
}
