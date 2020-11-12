import { useStaticQuery, graphql } from "gatsby"

export const useJobs = (currentDate) => {
  console.log('useJobs')
  const data = useStaticQuery(
    graphql`
      query {
          allWpJob (
            sort: {fields: publication___publishDate, order: DESC}
          ){
            nodes {
              id
              blocks {
                ...AllBlocks
              }
              title
              slug
              uri
              publication {
                unpublishDate
                publishDate
              }
              properties {
                appUrl
                jobType
                location
              }
            }
         } 
      }
    `
  )
  
  let returnData = []
  console.log(data.allWpJob)
  for (let i = 0; i < data.allWpJob.nodes.length ; i++) {
    console.log('job', data.allWpJob.nodes[i])
    if ( (data.allWpJob.nodes[i].publication.publishDate === null || currentDate >= Date.parse(data.allWpJob.nodes[i].publication.publishDate.replace(/\s/g, 'T')) ) &&
         (data.allWpJob.nodes[i].publication.unpublishDate === null || currentDate < Date.parse(data.allWpJob.nodes[i].publication.unpublishDate.replace(/\s/g, 'T')) )) {
      returnData.push(data.allWpJob.nodes[i])
    }
  }
  
  return returnData
}
