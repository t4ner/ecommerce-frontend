import Banner from "@/components/layout/Banner";
import Categories from "@/components/layout/Categories";
import FeaturedProducts from "@/components/layout/FeaturedProducts";
import Campaigns from "@/components/layout/Campaigns";
import NewProducts from "@/components/layout/NewProducts";
import InfoBar from "@/components/layout/InfoBar";

export default function Home() {
  return (
    <div className= "space-y-15 lg:space-y-30">
      <Banner />
      <Categories />
      <FeaturedProducts />
      <Campaigns />
      <NewProducts />
      <InfoBar />
    </div>
  );
}
