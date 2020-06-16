export async function fetchGroupData (len) {
    try {
        const response = await fetch('http://localhost:8000/giveGroupsData/?len=' + len, {method: 'GET'});
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log("Error in fetchGroupData: ", err);
    }
}

export async function fetchPostData (stringToMatch, userToMatch) {
    try {
        let query = '?stringToMatch=' + stringToMatch;
        if (userToMatch !== "")
            query += '&userToMatch=' + userToMatch;
        const response = await fetch('http://localhost:8000/givePostData/' + query, {method: 'GET'});
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log("Error in fetchPostData: ", err);
    }
}
