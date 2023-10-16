import { createSlice } from "@reduxjs/toolkit";

//giá trị khởi tạo ban đầu, gọi từ backend về
const initialState = {
    listSanPham: [
        {
            id: 1,
            hinhAnh:
                "https://acecookvietnam.vn/wp-content/uploads/2017/07/H%E1%BA%A3o-H%E1%BA%A3o-T%C3%B4m-chua-cay_down33_.png",
            tenSp: "Mì Hảo Hảo tôm chua cay",
            giaBan: 4500,
            giaGiam: 0,
            gif: 1,
            dvt: ["gói", "thùng"],
            kho: 20,
            danhMuc: 'đồ ăn',
            thuongHieu: 'accook'
        },
        {
            id: 2,
            hinhAnh:
                "https://cooponline.vn/wp-content/uploads/2022/06/bia-tiger-lon-330ml-2023227.jpg",
            tenSp: "Bia tiger lon 330ml",
            giaBan: 20000,
            giaGiam: 17500,
            gif: 0,
            dvt: ["lon", "thùng"],
            kho: 10,
            danhMuc: 'đồ uống',
            thuongHieu: 'tiger'

        },
        {
            id: 3,
            hinhAnh:
                "https://dungculambanh.com.vn/wp-content/uploads/2020/11/duong-cat-bien-hoa-500gr.jpg",
            tenSp: "Đường cát trắng Biên hoà, bịch 1kg",
            giaBan: 28000,
            giaGiam: 24000,
            gif: 1,
            dvt: ["bịch"],
            kho: 90,
            danhMuc: 'đồ gia dụng',
            thuongHieu: 'biên hoà'

        },
        {
            id: 4,
            hinhAnh:
                "https://product.hstatic.net/200000548939/product/240-2_0773d428c19d4591b36804e244bf557c_ba4976017a8a4745af0a98bf7fb699b8_master.jpg",
            tenSp: "Nước mắm Thuận Phát, chai 1 lít",
            giaBan: 29000,
            giaGiam: 18000,
            gif: 0,
            dvt: ["chai"],
            kho: 10,
            danhMuc: 'nước mắm',
            thuongHieu: 'thuận phát'

        },
        {
            id: 5,
            hinhAnh:
                "https://storage.googleapis.com/mm-online-bucket/ecommerce-website/uploads/media/256191.jpg",
            tenSp: "Bột ngọt Vedan bịch 1kg",
            giaBan: 22000,
            giaGiam: 17000,
            gif: 0,
            dvt: ["bịch"],
            kho: 10,
            danhMuc: 'bột ngọt',
            thuongHieu: 'vedan'

        },
        {
            id: 6,
            hinhAnh: "https://alohay.vn/cdn/uploadv2/news/1596595864_13.jpg",
            tenSp: "Nước tương Chinsu chai 250ml",
            giaBan: 9000,
            giaGiam: 7000,
            gif: 0,
            dvt: ["chai"],
            kho: 10,
            danhMuc: 'nước tương',
            thuongHieu: 'chinsu'

        },
        {
            id: 7,
            hinhAnh:
                "https://product.hstatic.net/200000073345/product/tuong_ot_cholimex_pet_270gr_7e6adf3e97fc4f0aa3959b8e834abe9e_1024x1024.jpg",
            tenSp: "Tương ớt Cholimex chai 270g",
            giaBan: 7000,
            giaGiam: 6000,
            gif: 0,
            dvt: ["chai"],
            kho: 10,
            danhMuc: 'đồ gia dụng',
            thuongHieu: 'cholimex'

        },
        {
            id: 8,
            hinhAnh:
                "https://saphavi.eu/cdn/shop/products/8936017362331_1.jpg?v=1575477392",
            tenSp: "Nước mắm Chinsu chai 500ml",
            giaBan: 12000,
            giaGiam: 8000,
            gif: 1,
            dvt: ["chai"],
            kho: 70,
            danhMuc: 'đồ gia dụng',
            thuongHieu: 'chinsu'

        },
        {
            id: 9,
            hinhAnh:
                "https://product.hstatic.net/1000074072/product/bich_fino_sua_tuoi_-_khong_duong_c6990e9228e343b3b76885870916fec6_master.png",
            tenSp: "Sữa tươi Vinamilk bịch 220ml",
            giaBan: 7000,
            giaGiam: 5000,
            gif: 1,
            dvt: ["hộp", "lốc", "thùng"],
            kho: 10,
            danhMuc: 'đồ uống',
            thuongHieu: 'vinamilk'

        },
        {
            id: 10,
            hinhAnh: "https://phuhuong.vn/watermark/sua/vnm-1l-duong.gif",
            tenSp: "Sữa tươi Vinamilk hộp 1 lít",
            giaBan: 89000,
            giaGiam: 79000,
            gif: 1,
            dvt: ["hộp", "lốc", "thùng"],
            kho: 10,
            danhMuc: 'đồ uống',
            thuongHieu: 'vinamilk'

        },
        {
            id: 11,
            hinhAnh:
                "https://vietmartjp.com/wp-content/uploads/2020/09/tam-thai-tu-nhat-ca-gia-vi-viet-o-nhat-vietmart-99.jpg",
            tenSp: "Nước tương Tam Thái Tử chai 500ml",
            giaBan: 22000,
            giaGiam: 14000,
            gif: 1,
            dvt: ["chai"],
            kho: 10,
            danhMuc: 'đồ gia dụng',
            thuongHieu: 'chinsu'

        },
        {
            id: 12,
            hinhAnh:
                "https://cooponline.vn/wp-content/uploads/2020/10/mi-gau-do-ga-soi-pho-goi-63g.jpg",
            tenSp: "Mì Gấu đỏ",
            giaBan: 3600,
            giaGiam: 2600,
            gif: 1,
            dvt: ["gói", "thùng"],
            kho: 10,
            danhMuc: 'đồ ăn',
            thuongHieu: 'accook'

        },
        {
            id: 13,
            hinhAnh:
                "https://cooponline.vn/wp-content/uploads/2020/10/mi-gau-do-ga-soi-pho-goi-63g.jpg",
            tenSp: "Mì Gấu đỏ 2",
            giaBan: 3600,
            giaGiam: 2600,
            gif: 1,
            dvt: ["gói", "thùng"],
            kho: 0,
            danhMuc: 'đồ ăn',
            thuongHieu: 'accook'

        },
        {
            id: 14,
            hinhAnh:
                "https://product.hstatic.net/200000513457/product/thung-24-lon-bia-heineken-330ml-202012101537314618__1__dea31461d9ee45e5a33767878560fb52_master.jpg",
            tenSp: "Bia Heineken lon 330ml",
            giaBan: 24000,
            giaGiam: 21000,
            gif: 1,
            dvt: ["lon", "thùng"],
            kho: 50,
            danhMuc: 'đồ uống',
            thuongHieu: 'heineken'

        },
        {
            id: 15,
            hinhAnh:
                "https://salt.tikicdn.com/cache/w1200/ts/product/24/96/b4/3c55cf1fa24422230284c7b8f057ce3a.jpg",
            tenSp: "Thùng 30 gói mì Hảo Hảo tôm chua cay",
            giaBan: 105000,
            giaGiam: 95000,
            gif: 1,
            dvt: ["thùng"],
            kho: 40,
            danhMuc: 'đồ ăn',
            thuongHieu: 'accook'
        },
    ],
}

export const sanPhamSlice = createSlice({
    name: 'sanPham',

    //giá trị khởi tạo ban đầu
    initialState,

    //đường dispath về
    reducers: {
        timKiem: (state) => {
            console.log("thêm giỏ hàng")
        }

    }
})
export const { timKiem } = sanPhamSlice.actions;
export default sanPhamSlice.reducer