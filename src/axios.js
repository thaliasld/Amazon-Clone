import axios from "axios";

const instance = axios.create({
    // THE API (cloud function) URL
    baseURL: 'https://us-central1-clone-d38e4.cloudfunctions.net/api'
   // for testing change the above to this:
   // baseURL: 'http://localhost:5001/clone-d38e4/us-central1/api/' 
})

export default instance;