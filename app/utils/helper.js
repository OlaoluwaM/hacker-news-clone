export default function toFullDateString(time) {
  const date = new Date(time * 1000);
  return date.toLocaleDateString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short'
  });
}
