export function sortByAvgRating(array) {
  const onlyRated = array.filter(object => object.reviews > 0)
  return onlyRated.sort((a, b) => (a.avgRating < b.avgRating) ? 1 : -1)
}

export function formValues(formStructure) {
  return formStructure.map(field => {
    let name = field.name.replace(' ', '')
    name = name[0].toLowerCase() + name.substr(1)
    return { ...field, variable: name }
  })
}

export function stateValues(formStructure) {
  const fieldsObj = {}
  formStructure.map(field => {
    const name = field.name[0].toLowerCase() + field.name.substr(1).replace(' ', '')
    fieldsObj[name] = ''
  })
  return fieldsObj
}