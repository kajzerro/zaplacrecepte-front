export function getEndpoint() {
    if(process.env.REACT_APP_ENV === "local") {
        return "http://localhost:5000";
    }
    return "https://api.zaplacrecepte.pl";
}