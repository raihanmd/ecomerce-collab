export default function getUnixTimestamps() {
  let date = new Date();
  return Math.floor(date.getTime() / 1000);
}
