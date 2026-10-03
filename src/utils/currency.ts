// Standard exchange rate: 1 USD = 122.02 BDT
export const USD_TO_BDT_RATE = 122.02;

export function usdToBdt(usd: number): number {
  return Math.round(usd * USD_TO_BDT_RATE);
}

export function bdtToUsd(bdt: number): number {
  return Math.round((bdt / USD_TO_BDT_RATE) * 100) / 100;
}

/**
 * Formats an amount with both BDT and USD shown accurately.
 * @param amount The numeric value
 * @param baseCurrency Which currency the input amount is given in ('USD' | 'BDT')
 * @param primaryCurrency Which currency to display first ('BDT' | 'USD')
 */
export function formatDualPrice(
  amount: number,
  baseCurrency: 'USD' | 'BDT' = 'BDT',
  primaryCurrency?: 'USD' | 'BDT'
): { primary: string; secondary: string; full: string; bdt: number; usd: number } {
  let usdVal = 0;
  let bdtVal = 0;

  if (baseCurrency === 'USD') {
    usdVal = amount;
    bdtVal = usdToBdt(amount);
  } else {
    bdtVal = amount;
    usdVal = bdtToUsd(amount);
  }

  const prim = primaryCurrency || baseCurrency;

  const bdtFormatted = `৳${bdtVal.toLocaleString()}`;
  const usdFormatted = `$${usdVal >= 10 ? (Math.round(usdVal * 10) / 10).toLocaleString() : usdVal.toFixed(2)}`;

  if (prim === 'BDT') {
    return {
      primary: bdtFormatted,
      secondary: usdFormatted,
      full: `${bdtFormatted} (${usdFormatted})`,
      bdt: bdtVal,
      usd: usdVal
    };
  } else {
    return {
      primary: usdFormatted,
      secondary: bdtFormatted,
      full: `${usdFormatted} (${bdtFormatted})`,
      bdt: bdtVal,
      usd: usdVal
    };
  }
}
