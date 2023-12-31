// Buat array dengan jumlah index 100

let mainArray = [];

for (let i = 0; i < 100; i++) {
  mainArray.push(Math.floor(Math.random() * 50) + 1);
}

// Pecah menjadi 2 array berdasarkan index ganjil ataupun index genap

let arrayGenap = [];
let arrayGanjil = [];

for (let i = 0; i < mainArray.length; i++) {
  if (i % 2 === 0) {
    arrayGenap.push(mainArray[i]);
  } else {
    arrayGanjil.push(mainArray[i]);
  }
}

// Mencari perhitungan min, max, total dan rata rata

// 1. Perhitungan min

function cariMin(array) {
  let min = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  return min;
}

// 2. Perhitungan Max

function cariMax(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

// 3. Perhitungan Total

function cariTotal(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
}

// 4. Perhitungan Rata-rata

function cariRataRata(array) {
  let total = cariTotal(array);
  return total / array.length;
}

let minGenap = cariMin(arrayGenap);
let maxGenap = cariMax(arrayGenap);
let totalGenap = cariMax(arrayGenap);
let rataRataGenap = cariMax(arrayGenap);

let minGanjil = cariMin(arrayGanjil);
let maxGanjil = cariMax(arrayGanjil);
let totalGanjil = cariMax(arrayGanjil);
let rataRataGanjil = cariMax(arrayGanjil);

// Membandingkan hasil kedua array

let perbandingan = {};

if (minGenap > minGanjil) {
  perbandingan.min = "Min lebih besar pada array genap";
} else if (minGenap < minGanjil) {
  perbandingan.min = "Min lebih besar pada array ganjil";
} else {
  perbandingan.min = "Min memiliki nilai yang sama pada kedua array";
}

if (maxGenap > maxGanjil) {
  perbandingan.max = "Max lebih besar pada array genap";
} else if (minGenap < minGanjil) {
  perbandingan.max = "Max lebih besar pada array ganjil";
} else {
  perbandingan.max = "Max memiliki nilai yang sama pada kedua array";
}

if (totalGenap > totalGanjil) {
  perbandingan.total = "Total lebih besar pada array genap";
} else if (totalGenap < totalGanjil) {
  perbandingan.total = "Total lebih besar pada array ganjil";
} else {
  perbandingan.total = "Total memiliki nilai yang sama pada kedua array";
}

if (rataRataGenap > rataRataGanjil) {
  perbandingan.rataRata = "Rata-rata lebih besar pada array genap";
} else if (rataRataGenap < rataRataGanjil) {
  perbandingan.rataRata = "Rata-rata lebih besar pada array ganjil";
} else {
  perbandingan.rataRata = "Rata-rata memiliki nilai yang sama pada kedua array";
}

console.log("Array dengan jumlah indeks 100:");
console.log(mainArray);
console.log("Array genap dengan jumlah indeks 50:");
console.log(arrayGenap);
console.log("Array ganjil dengan jumlah indeks 50:");
console.log(arrayGanjil);

// Menampilkan hasil perhitungan
console.log("Hasil Perhitungan:");
console.log("Min Genap: " + minGenap);
console.log("Max Genap: " + maxGenap);
console.log("Total Genap: " + totalGenap);
console.log("Rata-rata Genap: " + rataRataGenap);

console.log("Min Ganjil: " + minGanjil);
console.log("Max Ganjil: " + maxGanjil);
console.log("Total Ganjil: " + totalGanjil);
console.log("Rata-rata Ganjil: " + rataRataGanjil);

console.log("Perbandingan:");
console.log(perbandingan);
