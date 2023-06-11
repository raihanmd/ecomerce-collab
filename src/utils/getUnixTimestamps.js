export default function getUnixTimestamps() {
  return Math.floor(new Date().getTime() / 1000);
}
