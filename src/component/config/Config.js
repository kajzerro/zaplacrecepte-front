export function getEndpoint() {
    if(process.env.REACT_APP_ENV === "local") {
        return "http://localhost:5000";
    }
    return "https://api." + (new URL(window.location.href).hostname).replace("www.", "");
}