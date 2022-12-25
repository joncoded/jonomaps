// last two parameters are "strings"
// ...key is the attribute you want to sort by
// ...order is either "desc" or "asc"
function sortByKey(array, key, order) {
  return array.sort(function(a, b) {
    const x = a[key]
    const y = b[key]
    return order === "desc" ? (x > y ? -1 : x < y ? 1 : 0) : x < y ? -1 : x > y ? 1 : 0
  })
}

// last three parameters are "strings"
// ...prop is usually just "metadata"
// ...key is the attribute you want to sort by
// ...order is either "desc" or "asc"
function sortMetadata(array, prop, key, order) {
  return array.sort(function(a, b) {
    const x = a[prop][key]
    const y = b[prop][key]
    return order === "desc" ? (x > y ? -1 : x < y ? 1 : 0) : x < y ? -1 : x > y ? 1 : 0
  })
}

export { sortByKey, sortMetadata }
