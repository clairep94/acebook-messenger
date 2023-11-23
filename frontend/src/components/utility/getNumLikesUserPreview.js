  // --------- "You/User and X others liked this" ---------------

const formatLikesUsersPreview = (arr, sessionUserID) => {
    const numLikes = arr.length;
    // 0 likes
    if (numLikes === 0){
      return "Noone liked this"
    // 1 like
    } else if (numLikes === 1){ //Check if sessionUserID liked this
      return (arr.some(user => user._id === sessionUserID) ? 'You liked this' : `${arr[0].firstName} ${arr[0].lastName} liked this`);
    // 2 likes
    } else if (numLikes === 2){
      return (arr.some(user => user._id === sessionUserID) ? 'You and 1 other liked this' : `${arr[0].firstName} ${arr[0].lastName} and 1 other liked this`);
    // 3 or more likes
    } else {
      return (arr.some(user => user._id === sessionUserID) ? `You and ${numLikes - 1} others liked this` : `${arr[0].firstName} ${arr[0].lastName} and ${numLikes - 1} others liked this`);
    }
  };

export default formatLikesUsersPreview;
