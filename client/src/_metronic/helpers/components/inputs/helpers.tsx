export function checkStrength(password: string = "") {
    let strength = 0;

    //If password contains both lower and uppercase characters
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        strength += 1;
       
    } 
    //If it has numbers and characters
    if (password.match(/([0-9])/)) {
        strength += 1;
       
    } 
    //If it has one special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength += 1;
    } 
    //If password is greater than 7
    if (password.length > 7) {
        strength += 1;
    }

    // If value is less than 2
    return strength
}