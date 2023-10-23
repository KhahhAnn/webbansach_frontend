class SachModel {
   maSach: number;
   tenSach?: string;
   giaBan?: number;
   giaNiemYet?: number;
   moTa?: string;
   soLuong?: number;
   tenTacGia?: string;
   trungBinhXepHang?: number;

   constructor(
      maSach: number,
      giaBan?: number,
      giaNiemYet?: number,
      moTa?: string,
      soLuong?: number,
      tenSach?: string,
      tenTacGia?: string,
      trungBinhXepHang?: number,
   ) {
      this.maSach = maSach;
      this.giaBan = giaBan;
      this.giaNiemYet = giaNiemYet;
      this.moTa = moTa;
      this.soLuong = soLuong;
      this.tenSach = tenSach;
      this.tenTacGia = tenTacGia;
      this.trungBinhXepHang = trungBinhXepHang;
   }

}

export default SachModel;