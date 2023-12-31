// Soal 1
let suhuAir = 150;

const kondisiAir =
  suhuAir >= -100 && suhuAir <= 0
    ? "Beku"
    : suhuAir >= 1 && suhuAir <= 100
    ? "Cair"
    : suhuAir >= 101 && suhuAir <= 500
    ? "Uap"
    : "Tidak terdefinisi";

console.log("Kondisi air : " + kondisiAir);

// Soal 2
let plat = "putih";
let jenisKendaraan = "mobil";
let cc = 1500;

const jenisBBM =
  plat.toLowerCase === "kuning" || jenisKendaraan.toLowerCase === "motor"
    ? "BBM Subsidi"
    : jenisKendaraan.toLowerCase === "mobil" && cc < 1500
    ? "PERTAMAX"
    : jenisKendaraan.toLowerCase === "mobil" && cc >= 1500
    ? "Pertamax Turbo"
    : "Tidak Terdefinisi";

console.log("Jenis BBM : " + jenisBBM);
