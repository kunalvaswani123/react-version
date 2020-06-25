function b64toBlob(b64) {
    var byteString = atob(b64);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

export async function handleDatabaseChange (newState) {
    try {
        let postUrl = "http://localhost:8000/addUser/?update=yes&user=" + newState.userState.userData.user;
        const postObject = {
            method: 'POST',
            body: null
        };
        let formDataToChangeImage = new FormData();
        formDataToChangeImage.append("myfile", b64toBlob(newState.userState.userData.imgData), "image.png");
        postObject.body = formDataToChangeImage;
        const response = fetch(postUrl, postObject);
        return response;
    }
    catch (err) {
        console.log("Error in fetchPostData: ", err);
    }
}