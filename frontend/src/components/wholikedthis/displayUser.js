import React, { useEffect, useState } from 'react';

const DisplayUser = (user) => {
    return (
        <p> {user.firstName} {user.lastName}</p>
    )
}

export default DisplayUser;