import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "FABRA - Craft your career, your way",
  description:
    "An AI-guided workspace to analyze your CV, shape it for each opportunity, and turn everyday work into career momentum.",
  icons: {
    icon: "/logo/fabra-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script id="history-restore-reload" strategy="beforeInteractive">
          {`
            (function () {
              var reloadKey = "fabra-history-restore-reloaded";
              function reloadOnce() {
                try {
                  if (sessionStorage.getItem(reloadKey) === "1") {
                    sessionStorage.removeItem(reloadKey);
                    return;
                  }
                  sessionStorage.setItem(reloadKey, "1");
                } catch (_) {}
                window.location.reload();
              }

              window.addEventListener("pageshow", function (event) {
                if (event.persisted) reloadOnce();
              });

              var navigation = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
              if (navigation && navigation.type === "back_forward") {
                reloadOnce();
              }
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
