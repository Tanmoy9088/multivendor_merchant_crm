import React from "react";
import Providers from "../Provider";

const MerchantLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
};

export default MerchantLayout;
