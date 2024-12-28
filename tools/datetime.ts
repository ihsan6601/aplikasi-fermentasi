export const locale = "en";
const dateTime = new Date(new Date().getTime() + 7 * 3600);
export const year = dateTime.getFullYear();
export const month = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
][dateTime.getMonth()];
export const date = dateTime.getDate();
export const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][
  dateTime.getDay()
];
export const getEpochSecond = Math.floor(dateTime.getTime() / 1000);