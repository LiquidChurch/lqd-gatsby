export const locationLookup = (location) => {
  let locationText = ""
  switch(location){
    case 'par': locationText = 'Parsippany Central Office'; break;
    case 'ess': locationText = 'Essex County'; break;
    case 'mid': locationText = 'Middlesex County'; break;
    case 'mon': locationText = 'Monmouth County'; break;
    case 'mor': locationText = 'Morris County'; break;
		case 'som': locationText = 'Somerset County'; break;
		case 'gar': locationText = 'Union County Garwood'; break;
		case 'mtn': locationText = 'Union County Mountainside'; break;
		case 'fut': locationText = 'Future Campuses'; break;
		case 'any': locationText = 'Anywhere'; break;
    default: locationText = ''
  }
  return locationText
}

export const jobTypeLookup = (type) => {
    let jobType = ""
    switch(type){
      case "full": jobType = "Full Time"; break;
      case "part": jobType = "Part Time"; break;
      case "intern": jobType = "Internship"; break;
      case "vstaff": jobType = "Volunteer Staff"; break;
      case "vol": jobType = "Volunteer"; break;
      default: jobType = '' 
    }
  return jobType
}

export const postLengthCalc = (publishDate) => {
  let postLength = ""
  const date1 = new Date();
  const date2 = new Date(publishDate)

  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.round(diffDays / 7)
  const diffMonth = Math.round(diffDays / 30)
  const diffYear = Math.round(diffDays / 365)
  
  if (isNaN(parseFloat(diffTime))) {
    return ''
  }
  
  if (diffDays < 2) {
    postLength = "Posted " + diffDays + " day ago"    
  } else if (diffDays < 12) {
    postLength = "Posted " + diffDays + " days ago"
  } else if (diffWeeks < 7) {
    postLength = "Posted " + diffWeeks + " weeks ago"
  } else if (diffMonth < 12) {
    postLength = "Posted " + diffMonth + " months ago"
  } else {
    postLength = "Posted " + diffYear + " year ago"
  }
    
  return postLength
}