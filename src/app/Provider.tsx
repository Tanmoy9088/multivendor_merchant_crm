"use client";

import store from "@/store/store";
// import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
// import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default Providers;
