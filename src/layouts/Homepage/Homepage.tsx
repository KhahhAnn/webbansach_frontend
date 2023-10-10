import DanhSachSanPham from "../product/DanhSachSanPham";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";

const Homepage = () => {
   return(
      <div>
         <Banner />
         <Carousel />
         <DanhSachSanPham />
      </div>
   );
}
export default Homepage;