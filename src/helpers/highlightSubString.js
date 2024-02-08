export default function highlightSubString(
  str,
  subStr,
  highlightClass = 'highlight',
  caseSensitive = false
) {
  subStr = subStr
    .replace(/\s+/g, ' ')
    .trim();

  const regExp = new RegExp(subStr, caseSensitive ? 'g' : 'gi');

  return str.replaceAll(regExp, (match) => `<b class="${highlightClass}">${match}</b>`);
}