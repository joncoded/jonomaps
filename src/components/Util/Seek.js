export default function seekResults(query, setResults, relevant) {
  query !== ""
    ? setResults(
        relevant.filter(slice => {
          const formattedTitle = slice.title.toLowerCase()
          const formattedContent = slice.content.toLowerCase()
          const formattedDate = slice.metadata.date || slice.modified_at
          const formattedQuery = query.toLowerCase()
          return formattedTitle.indexOf(formattedQuery) > -1 || formattedContent.indexOf(formattedQuery) > -1 || formattedDate.indexOf(formattedQuery) > -1
        })
      ) // chain to return if paginating: .slice(lowerBound, upperBound))
    : setResults(relevant)
}
