  // --------- "X like(s)" ---------------
  const formatNumLikes = (arr) => {
    const numLikes = arr.length;

    if (numLikes === 1){
      return "1 like"
    } else {
      return `${numLikes} likes`
    }}

export default formatNumLikes;