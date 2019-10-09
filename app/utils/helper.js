export default function toFullDateString(time) {
  const date = new Date(time * 1000);
  return date.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short'
  });
}
