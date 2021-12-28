import { PrismaClient } from "@prisma/client";
import { CMCCurrencyType } from "./types";

export const setCurrencyData = async (prisma: PrismaClient) => {
  const currentCurrencies = await prisma.currency.findMany({});

  if (currentCurrencies.length === 0) {
    if (process.env.CMC_PRO_API_KEY) {
      //Fetch new live currency data if the API key is set
      const newCurrencies = await updateCurrencies(prisma);
      return newCurrencies;
    } else {
      //Use stock currency data if it isn't available
      const newCurrencies = await genMockCurrencyData(prisma);
      return newCurrencies;
    }
  }

  // If the age of the prices is more than 1hr, update it
  const currentAge = currentCurrencies[0].age;
  const secSinceUpdate =
    (new Date().getTime() - new Date(currentAge).getTime()) / 1000;
  const secInHr = 3600;
  if (secSinceUpdate > secInHr && process.env.CMC_PRO_API_KEY) {
    const updatedCurrencies = await updateCurrencies(prisma);
    return updatedCurrencies;
  }
  return currentCurrencies;
};

export const updateCurrencies = async (prisma: PrismaClient) => {
  const resp = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5&convert=USD",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_PRO_API_KEY || "",
        Accept: "application/json",
      },
    }
  );
  const jsonifiedResult = await resp.json();

  const newCurrencies = await prisma.$transaction(
    jsonifiedResult.data.map((oneCurrency: CMCCurrencyType) => {
      return prisma.currency.upsert({
        where: { name: oneCurrency.symbol },
        update: {
          priceUSD: oneCurrency.quote.USD.price,
          age: new Date().toISOString(),
        },
        create: {
          name: oneCurrency.symbol,
          priceUSD: oneCurrency.quote.USD.price,
          age: new Date().toISOString(),
        },
      });
    })
  );

  return newCurrencies;
};

const mockData: CMCCurrencyType[] = [
  { symbol: "ETH", quote: { USD: { price: 4012.09 } } },
  { symbol: "BTC", quote: { USD: { price: 49374.6 } } },
  { symbol: "SOL", quote: { USD: { price: 179.82 } } },
];

export const genMockCurrencyData = async (prisma: PrismaClient) => {
  const mockedResult = await Promise.all(
    mockData.map((oneCurrency: CMCCurrencyType) =>
      prisma.currency.create({
        data: {
          name: oneCurrency.symbol,
          priceUSD: oneCurrency.quote.USD.price,
          age: new Date().toISOString(),
        },
      })
    )
  );
  return mockedResult;
};
