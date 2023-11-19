// ------------ '19 Nov 2023, 5:45PM' -------------

const formatFullDateString = (dateObject) => {

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return dateObject.toLocaleString('en-GB', options)
}

export default formatFullDateString;