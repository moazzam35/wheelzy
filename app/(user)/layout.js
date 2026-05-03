import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header/page";
import Footer from "./Footer/page";
import Preloader from "./preloader/preloader";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Wheelzy | Premium Automotive Collection",
  description: "Discover a curated selection of luxury, sports, and exotic vehicles. White-glove delivery, tailored financing, and unparalleled automotive excellence.",
  openGraph: {
    title: "Wheelzy | Premium Automotive Collection",
    description: "Discover a curated selection of luxury, sports, and exotic vehicles.",
    siteName: "Wheelzy",
    images: [{ url: "/comp/images/hero-poster.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('wheelzy-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Next.js manages head. Scripts placed here can conflict with Turbopack HMR scripts during hydration. */}
      </head>
      <body>
        {/* plain <script> as first child of body — runs before paint, avoids <head> hydration conflicts */}
        <script id="theme-script" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeScript }
      } />
      <Preloader/>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}