export const textStyles = {
  h1: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "28px",
    lineHeight: "34px",
    letterSpacing: "0px",
  },
  h2: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "0px",
  },
  h3: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "0px",
  },
  h4: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "0px",
  },
  h5: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0.1px",
  },
  body: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0.1px",
  },
  "body-bold": {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0.1px",
  },
  caption: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
  },
  "caption-medium": {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
  },
} as const;

export type TextStyleName = keyof typeof textStyles;
