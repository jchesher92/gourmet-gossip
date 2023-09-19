const array = []

export function sortByAvgRating(array) {
  array.sort((a, b) => (a.avgRating > b.avgRating) ? 1 : -1)
}