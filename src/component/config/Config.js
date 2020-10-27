export function getEndpoint() {
    if(process.env.REACT_APP_ENV === "local") {
        return "http://localhost:5000";
    }
    return "https://api." + (new URL(window.location.href).hostname).replace("www.", "");
}

export function saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function isPrescriptionClientType() {
    return getUserData().clientType === "PRESCRIPTION_BASED";
}

export function isServiceClientType() {
    return getUserData().clientType === "SERVICE_BASED";
}