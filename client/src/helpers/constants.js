let serverUrl = "http://localhost:8080";
if(process.env.REACT_HOST) {
    serverUrl = process.env.REACT_HOST
}
export default serverUrl ;