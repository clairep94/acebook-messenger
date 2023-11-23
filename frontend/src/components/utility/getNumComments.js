// ----------- "X comment(s)" ---------------

const formatNumComments = (arr) => {
    const numComments = arr.length;

    if (numComments === 1) {
        return '1 comment'
    } else {
        return `${numComments} comments`
    }
}

export default formatNumComments;