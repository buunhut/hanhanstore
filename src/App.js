import "./app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TrangChu from './components/trangchu/TrangChu'
import SanPham from "./components/sanpham/SanPham";
import DanhMuc from "./components/danhmuc/DanhMuc";
import ThuongHieu from "./components/thuonghieu/ThuongHieu";
import ThongBao from "./components/thongbao/ThongBao";
import TaiKhoan from "./components/taikhoan/TaiKhoan";
import TimKiem from "./components/timkiem/TimKiem";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrangChu />}>
          <Route index element={<SanPham />} />
          <Route path="/danh-muc" element={<DanhMuc />} />
          <Route path="/thuong-hieu" element={<ThuongHieu />} />
          <Route path="/thong-bao" element={<ThongBao />} />
          <Route path="/tai-khoan" element={<TaiKhoan />} />
        </Route>
        <Route path="/tim-kiem" element={<TimKiem />} />


      </Routes>


    </BrowserRouter>
  );
}

export default App;
