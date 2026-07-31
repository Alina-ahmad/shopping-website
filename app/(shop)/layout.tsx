import HeaderTop from '@/components/HeaderTop';
import HeaderMain from "@/components/HeaderMain";
import Navbar from "@/components/Navbar";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderTop />
      <HeaderMain />
      <Navbar />
      {children}
    </>
  );
}