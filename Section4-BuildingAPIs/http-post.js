import http from 'k6/http';

export default function () {

    const credentials = {
        username: 'testuser_' + Date.now(),
        password: 'testpassword' + Date.now(),
    };

    // POST request to a public API
    let res = http.post('http://localhost:8000/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json',
            } 
        }
    ); 

    // Check if the response is successful
    if (res.status !== 201) {
        console.error('Failed to POST new user');
    }
}
