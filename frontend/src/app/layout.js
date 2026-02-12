import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "LavishBite — Health-Compliant Food for Hotels & Hospitality",
  description:
    "A decision-support food platform for hotels and food service providers. Shop health-compliant foods for cardiovascular, diabetes, and hypertension conditions.",
  keywords:
    "health food, hotel food service, cardiovascular diet, diabetes friendly food, hypertension diet, DASH diet, nutritional food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
