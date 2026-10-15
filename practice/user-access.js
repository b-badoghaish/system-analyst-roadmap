let userName = "Badur";
let userRole = "Admin";
let isActive = true;

if(userRole === "Admin" && isActive === true){
    console.log("Welcome " + userName +" - Full Access")
} else if(userRole === "Employee" && isActive === true){
    console.log("Welcome " + userName +" - Limited Access")
} else{
    console.log("Access Denied")
}