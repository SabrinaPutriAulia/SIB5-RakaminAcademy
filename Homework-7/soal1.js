// Impor modul geometry
const geometry = require("./geometry");

const sisi = 5;
const luasPersegi = geometry.luasPersegi(sisi);
const kelilingPersegi = geometry.kelilingPersegi(sisi);

console.log(`Luas persegi dengan sisi ${sisi} adalah ${luasPersegi}`);
console.log(`Keliling persegi dengan sisi ${sisi} adalah ${kelilingPersegi}`);

const panjang = 10;
const lebar = 5;
const luasPersegiPanjang = geometry.luasPersegiPanjang(panjang, lebar);
const kelilingPersegiPanjang = geometry.kelilingPersegiPanjang(panjang, lebar);

console.log(
  `Luas persegi panjang dengan panjang ${panjang} dan lebar ${lebar} adalah ${luasPersegiPanjang}`
);
console.log(
  `Keliling persegi panjang dengan panjang ${panjang} dan lebar ${lebar} adalah ${kelilingPersegiPanjang}`
);
