import axios from 'axios'

export const checkAuthState = async () => {
    let authState = await axios.get('/auth/checkAuthState')
    .then(response => {
        console.log(response.data)
        if (response.status === 200) {
            return true
        }
        return false;
    })
    .catch(response => {
        console.log(response);
        return false;
    })
}