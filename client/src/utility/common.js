export function sortByAvgRating(array) {
  const onlyRated = array.filter(object => object.reviews > 0)
  return onlyRated.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : -1)
}