export default class ProfileAPI{

    static getProfilePic() {

        const picture = JSON.parse(localStorage.getItem("notesapp-profile-picture") || '"./img/personIcon01.png"');
        
        return picture;
        
    }

    static getProfileName() {

        const name = JSON.parse(localStorage.getItem("notesapp-profile-name") || '"Type Your Name Here"');
        
        return name;
        
    }








    static saveProfilePic(imageData) {

        let getPicture = ProfileAPI.getProfilePic();
        getPicture = [];

        getPicture = imageData;
        localStorage.setItem("notesapp-profile-picture", JSON.stringify(getPicture));

    }

    static saveProfileName(name) {

        let getName = ProfileAPI.getProfileName();
        getName = [];
        
        getName = name;
        localStorage.setItem("notesapp-profile-name", JSON.stringify(getName));
        
    }
    
    
}