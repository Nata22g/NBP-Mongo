import axios from 'axios';

const splitCookies = () => {
    const cookies = document.cookie.split(';')
    let niz = {}
    cookies.forEach(element => {
        const [key, value] = element.split('=')
        niz[key] = value
    });
    return niz
}

const useRefreshToken = () => {

    const refresh = async () => {

        // const tokeni = document.cookie.split('=')
        // console.log(tokeni[1])

        const cookie = splitCookies()
        console.log(cookie)
        console.log("cookie "+cookie['token'])
        // // alert('cekaj')
        // console.log('use refresh')

        try {
            const response = await axios.post('http://localhost:8080/api/auth/refresh', {
                refreshToken: cookie['token']
            });

            localStorage.setItem('token', response.data.accessToken)
            document.cookie = 'token=' + response.data.refreshToken
            
            return response.data.accessToken;
        }
        catch (err) {
            localStorage.clear()
            console.log(err.response.data)
            alert('Istekla vam je sesija molimo ulogujte se opet')
            console.log(err)
          //  document.cookie = 'token=' + ''
            // window.location.reload()
        }

    }
    return refresh;
};

export default useRefreshToken;
