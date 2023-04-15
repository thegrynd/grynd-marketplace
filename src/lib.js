import getConfig from "next/config";
import ceil from "lodash/ceil";
import { differenceInMinutes } from "date-fns";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param  date - which is created comment data
 * @returns string - formatted from now
 */

function getDateDifference(date) {
  let diff = differenceInMinutes(new Date(), new Date(date));
  if (diff < 60) return diff + " minutes ago";
  diff = ceil(diff / 60);
  if (diff < 24) return `${diff} hour${diff === 0 ? "" : "s"} ago`;
  diff = ceil(diff / 24);
  if (diff < 30) return `${diff} day${diff === 0 ? "" : "s"} ago`;
  diff = ceil(diff / 30);
  if (diff < 12) return `${diff} month${diff === 0 ? "" : "s"} ago`;
  diff = diff / 12;
  return `${diff.toFixed(1)} year${ceil(diff) === 0 ? "" : "s"} ago`;
}

/**
 * RENDER THE PRODUCT PAGINATION INFO
 * @param page - CURRENT PAGE NUMBER
 * @param perPageProduct - PER PAGE PRODUCT LIST
 * @param totalProduct - TOTAL PRODUCT NUMBER
 * @returns
 */

function renderProductCount(page, perPageProduct, totalProduct) {
  let startNumber = (page - 1) * perPageProduct;
  let endNumber = page * perPageProduct;
  if (endNumber > totalProduct) {
    endNumber = totalProduct;
  }
  return `Showing ${startNumber - 1}-${endNumber} of ${totalProduct} products`;
}

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */

function calculateDiscount(price, discount) {
  const afterDiscount = Number((price - price * (discount / 100)).toFixed(2));
  return currency(afterDiscount);
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */

function currency(price, fraction = 2) {
  const { publicRuntimeConfig } = getConfig();
  const formatCurrency = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: publicRuntimeConfig.currency,
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction,
  });
  return formatCurrency.format(price);
}

// const checkout = async (items) => {
//   try {
//     const lineItems = items.map((p) => ({ price: p.id, quantity: p.qty }));
//     const { session } = await fetch("/api/stripe/sessions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ lineItems }),
//     }).then((res) => res.json());

//     const stripe = await stripePromise;
//     const { error } = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     if (error) {
//       if (error instanceof Error) throw new Error(error.message);
//     } else {
//       throw error;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
export {
  renderProductCount,
  calculateDiscount,
  currency,
  getDateDifference,
  // checkout
};
