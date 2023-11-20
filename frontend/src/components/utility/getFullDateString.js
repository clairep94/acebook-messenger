// ------------ '19 Nov 2023 at 5:45PM' -------------

const formatFullDateString = (dateObject) => {

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return dateObject.toLocaleString('en-GB', options).replace(',', ' at')
}

export default formatFullDateString;