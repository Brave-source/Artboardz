const validation = (values) => {
    let errors = {};

     if(!values.twitter){
        errors.twitter = "Twitter account is required"
     }else if(!/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/.test(values.twitter)) {
        errors.twitter = "Please provide valid twitter account"
    }
    if(!values.name) {
        errors.name = "Name is required"
    }
    if(!values.nationality) {
        errors.nationality = "Country is required"
    }
    if(!values.image) {
        errors.image = "Image is required"
    }

    return errors;
}

export default validation;