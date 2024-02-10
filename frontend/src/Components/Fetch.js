import { LoginSuccess, LoginFailure, LoginStart } from '../Context/UserAction.js'

export const GetData = async (url, setData, setError, setIsLoading) => {

    setIsLoading(true)
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Bearer': localStorage.getItem("token")
            },
        })
        console.log(response)

        if (response.ok) {

            const data = await response.json();
            console.log(data)
            setData(data);
        }
        else {
            throw new Error("Greška prilikom učitavanja --- " + response.statusText);
        }
        setIsLoading(false)
        setError(false)
    }
    catch (error) {
        setIsLoading(false)
        setData([])
        console.log(error)
        setError(true + error)
    };
}

export const LoginMetoda = async (zahtev, dispatch, setGreska) => {
    // console.log(zahtev)

    // dispatch(LoginStart())
    setGreska(false)

    await fetch(zahtev.url, {
        method: "POST",
        headers: zahtev.headers,
        body: JSON.stringify(zahtev.body)
    }).then(async p => {
        await p.json()
            .then(data => {
                if (p.ok) {
                    setGreska(false)
                    dispatch(LoginSuccess(data))
                    localStorage.setItem('token'.JSON.stringify(data.token))
                }
                else if (p.status === 404) {
                    setGreska('Ne postoji takav korisnik')
                }
                else if (p.status === 400) {
                    setGreska('Pogrešna lozinka')
                    // dispatch(LoginFailure(nesto))
                }
                else {
                    setGreska('doslo je do greške')
                }
            })
    }).catch(error => {
        setGreska(error)

        // dispatch(LoginFailure(error))
        console.log(error)
    })

}

export const PostMetoda = async (zahtev, setData, setGreska) => {
    await fetch(zahtev.url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

            'Bearer': localStorage.getItem("token")

        },
        body: JSON.stringify(zahtev.body)
    }).then(p => {
        p.json()
            .then(data => {
                console.log(p)
                if (p.ok) {
                    setData(data)
                }
                else if (p.status == 404) {
                    setGreska('Ne postoji')
                }
                else {
                    setGreska(p.statusText)
                }
            })
    }).catch(error => {
        // setGreska('Doslo je do greske!')
        console.log(error)
    })
}

export const PutMetoda = async (zahtev, setData, setGreska, setIsLoading) => {
    setIsLoading(true)
    setGreska(false)

    await fetch(zahtev.url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Bearer':localStorage.getItem("token")

        },
        body: JSON.stringify(zahtev.body)
    }).then(p => {
        p.json()
            .then(data => {
                // console.log(data)
                if (p.ok) {
                    setData(data)
                    setIsLoading(false)
                    setGreska(false)
                }
                else if (p.status == 404) {
                    setGreska('Ne postoji')
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    setGreska(p.statusText)
                }
            })
    }).catch(error => {
        setIsLoading(false)
        setGreska('Doslo je do greske!')
        console.log(error)
    })
}

export const DeleteMetoda = async (zahtev, setGreska, setIsLoading) => {
    setIsLoading(true)
    setGreska(false)

    await fetch(zahtev.url, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Bearer':localStorage.getItem("token")
        },
        body: JSON.stringify(zahtev.body)
    }).then(p => {
        p.json()
            .then(data => {
                if (p.ok) {

                    console.log(p)
                    // setData(data)
                    setIsLoading(false)
                    setGreska(false)
                }
                else if (p.status == 404) {
                    setGreska('Ne postoji')
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    setGreska(p.statusText)
                }
            })
    }).catch(error => {
        setIsLoading(false)
        setGreska('Doslo je do greske!')
        console.log(error)
    })
}