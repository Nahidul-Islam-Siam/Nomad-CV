import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton/ScrollToTopButton";
import { NextUiProvider } from "@/lib/providers/NextUIProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Aiarealty || Find Your Dream Home",
  description:
    "Aiarealty - Your One-Stop Solution for Finding Your Dream Home. Explore a Wide Range of Properties, Compare Prices, and Find the Perfect Place to Call Home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NextUiProvider>
        <ReduxProvider>
          <>
            <div className="min-h-screen grid grid-rows-[auto_1fr_auto] max-w-[100vw] overflow-hidden">
              <Navbar />
              <div className="min-h-[60vh]">{children}</div>

              <Footer />
            </div>
            <ScrollToTopButton />
        
          </>
        </ReduxProvider>
      </NextUiProvider>
    </div>
  );
}
