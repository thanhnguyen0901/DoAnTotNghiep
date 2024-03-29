import React from "react";
import { createStackNavigator } from "react-navigation";
import ChiTieu from "./src/components/ChiTieu";
import ChiTieuCopy from "./src/components/ChiTieuCopy";
import ThuNhap from "./src/components/ThuNhap";
import ThuNhapCopy from "./src/components/ThuNhapCopy";
import ChuyenKhoan from "./src/components/ChuyenKhoan";
import DieuChinhSoDu from "./src/components/DieuChinhSoDu";
import ChonHangMucChi from "./src/components/ChonHangMucChi";
import ChonHangMucThu from "./src/components/ChonHangMucThu";
import ChiChoAi from "./src/components/ChiChoAi";
import ThuTuAi from "./src/components/ThuTuAi";
import ChonTaiKhoan from "./src/components/ChonTaiKhoan";
import ChonTaiKhoanNguon from "./src/components/ChonTaiKhoanNguon";
import ChonTaiKhoanDich from "./src/components/ChonTaiKhoanDich";
import ChonTaiKhoanDCSD from "./src/components/ChonTaiKhoanDCSD";
import LichSuGhiChep from "./src/components/LichSuGhiChep";
import Khac from "./src/components/Khac";
import TaiKhoan from "./src/components/TaiKhoan";
import ThemMoi from "./src/components/ThemMoi";
import ThemMoiCopy from "./src/components/ThemMoiCopy";
import TongQuan from "./src/components/TongQuan";
import ThemTaiKhoan from "./src/components/ThemTaiKhoan";
import ChinhSuaTaiKhoan from "./src/components/ChinhSuaTaiKhoan";
import GhiChepCuaTaiKhoan from "./src/components/GhiChepCuaTaiKhoan";
import CachXemLichSuGhiChep from "./src/components/CachXemLichSuGhiChep";
import ChinhSuaChiTieu from "./src/components/ChinhSuaChiTieu";
import ChinhSuaThuNhap from "./src/components/ChinhSuaThuNhap";
import ChinhSuaChuyenKhoan from "./src/components/ChinhSuaChuyenKhoan";
import ChinhSuaDieuChinhSoDu from "./src/components/ChinhSuaDieuChinhSoDu";

const AppNavigator = createStackNavigator(
  {
    ThemMoi: { screen: ThemMoi },
    ThemMoiCopy: { screen: ThemMoiCopy },
    ChiTieu: { screen: ChiTieu },
    ChiTieuCopy: { screen: ChiTieuCopy },
    ThuNhap: { screen: ThuNhap },
    ThuNhapCopy: { screen: ThuNhapCopy },
    ChuyenKhoan: { screen: ChuyenKhoan },
    DieuChinhSoDu: { screen: DieuChinhSoDu },
    ChonHangMucChi: { screen: ChonHangMucChi },
    ChonHangMucThu: { screen: ChonHangMucThu },
    ChiChoAi: { screen: ChiChoAi },
    ThuTuAi: { screen: ThuTuAi },
    ChonTaiKhoan: { screen: ChonTaiKhoan },
    Khac: { screen: Khac },
    TaiKhoan: { screen: TaiKhoan },
    TongQuan: { screen: TongQuan },
    ChonTaiKhoanDich: { screen: ChonTaiKhoanDich },
    ChonTaiKhoanNguon: { screen: ChonTaiKhoanNguon },
    ChonTaiKhoanDCSD: { screen: ChonTaiKhoanDCSD },
    ThemTaiKhoan: { screen: ThemTaiKhoan },
    ChinhSuaTaiKhoan: { screen: ChinhSuaTaiKhoan },
    GhiChepCuaTaiKhoan: { screen: GhiChepCuaTaiKhoan },
    LichSuGhiChep: { screen: LichSuGhiChep },
    CachXemLichSuGhiChep: { screen: CachXemLichSuGhiChep },
    ChinhSuaChiTieu: { screen: ChinhSuaChiTieu },
    ChinhSuaThuNhap: { screen: ChinhSuaThuNhap },
    ChinhSuaChuyenKhoan: { screen: ChinhSuaChuyenKhoan },
    ChinhSuaDieuChinhSoDu: { screen: ChinhSuaDieuChinhSoDu }
  },
  {
    headerMode: "none"
  }
);

export default AppNavigator;
