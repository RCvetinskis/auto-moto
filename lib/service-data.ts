import { ServiceDataOptionsType } from "@/types";

function calculateDiscountedPrice(
  initialPrice: number,
  discountPercentage: number
) {
  const discountDecimal = discountPercentage / 100;
  const discountAmount = initialPrice * discountDecimal;
  const discountedPrice = initialPrice - discountAmount;
  const roundedDiscountedPrice = Math.round(discountedPrice * 100) / 100;

  return roundedDiscountedPrice.toString();
}
export const serviceData: ServiceDataOptionsType[] = [
  {
    service: "premium",
    options: [
      { adTime: "Ad time 90 days" },
      { adHighlight: "Ad Hightlight 14 days" },
      { initialPrice: "Regular price 69$" },
      { discount: "Discount 75%" },
      { price: `Price ${calculateDiscountedPrice(69, 75)}$` },
    ],
  },
  {
    service: "regular",
    options: [
      { adTime: "Ad time 60 days" },
      { adHighlight: "Ad Hightlight 7 days" },
      { initialPrice: "Regular price 50$" },
      { discount: "Discount 33%" },
      { price: `Price ${calculateDiscountedPrice(50, 33)}$` },
    ],
  },
  {
    service: "free",
    options: [
      { adTime: "Ad time 30 days" },

      { adHighlight: "-" },
      { initialPrice: "-" },
      { discount: "-" },
      { price: `Free!` },
    ],
  },
];
