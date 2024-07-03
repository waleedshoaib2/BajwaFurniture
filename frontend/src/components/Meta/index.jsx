import React from "react";
import { Helmet } from "react-helmet";

export default function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "Bajwa Furniture",
  description: "We sell the best modern furniture",
  keywords: "Buy from us!",
};
