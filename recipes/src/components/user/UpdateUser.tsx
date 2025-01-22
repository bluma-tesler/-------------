import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { UserContext, UserType } from "../../userReducer"
import { Button, Card, TextField } from "@mui/material"
import { useNavigate } from "react-router"
const UpdateUser = () => {
    const { state: user, dispatch: userDispatch } = useContext(UserContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [isFirstNameValid, setIsFirstNameValid] = useState(true)
    const [isLastNameValid, setIsLastNameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isAddressValid, setIsAddressValid] = useState(true)
    const [isPhoneValid, setIsPhoneValid] = useState(true)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { id, value } = e.target
        userDispatch({ type: 'update', data: { [id]: value } })
    }
    const handleClickLogOut = () => {
        userDispatch({
            type: 'logOut'
        })
        navigate('/')
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const firstName = user.firstName
        const lastName = user.lastName
        const email = user.email
        const address = user.address
        const phone = user.phone

        setIsFirstNameValid(!!firstName)
        setIsLastNameValid(!!lastName)
        setIsEmailValid(!!email)
        setIsAddressValid(!!address)
        setIsPhoneValid(!!phone)

        if (!firstName || !lastName || !email || !address || !phone) {
            return 
        }
        try {
            const response = await fetch('http://localhost:3000/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': `${user.id}`,
                    'access-control-allow-origin': '*',
                },
                body: JSON.stringify(user)

            })
            if (!response.ok)
                throw new Error(`update user failed ${response.status}`)
            const userToUpdate: UserType = await response.json()
            userDispatch({
                type: 'update', data: userToUpdate
            })
            setOpen(false)
        }
        catch (err) {
            console.error(err)
        }

    }
    const handleFocus = (field: 'firstName' | 'lastName' | 'email' | 'address' | 'phone') => {
        if (field === 'firstName') {
            setIsFirstNameValid(true)
        }
        else if (field === 'lastName') {
            setIsLastNameValid(true)
        }
        else if (field === 'email') {
            setIsEmailValid(true)
        }
        else if (field === 'address') {
            setIsAddressValid(true)
        }
        else if (field === 'phone') {
            setIsPhoneValid(true)
        }
    };
    const handleClick = () => {
        setOpen(true)

    }

    return (
        <>
            <Button
                sx={{ margin: 3 }}
                type="submit"
                variant="contained"
                color="success"
                onClick={handleClick}
            > UpdateUser

            </Button>
            {open &&
                <Card sx={{ maxWidth: 250 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField sx={{ margin: 3, marginBottom: 0 }}
                            id="firstName"
                            label="first name"
                            color={(isFirstNameValid) ? 'success' : 'warning'}
                            helperText={(isFirstNameValid) ? '' : 'must be full'}
                            onFocus={() => handleFocus('firstName')}
                            value={user.firstName}
                            onChange={handleChange}
                            focused
                        />
                        <br />
                        <TextField sx={{ margin: 3, marginBottom: 0 }}
                            id="lastName"
                            label="last-name"
                            color={(isLastNameValid) ? 'success' : 'warning'}
                            helperText={(isLastNameValid) ? '' : 'must be full'}
                            onFocus={() => handleFocus('lastName')}
                            value={user.lastName}
                            onChange={handleChange}
                            focused
                        />
                        <br />
                        <TextField sx={{ margin: 3, marginBottom: 0 }}
                            id="email"
                            label="email"
                            color={(isEmailValid) ? 'success' : 'warning'}
                            helperText={(isEmailValid) ? '' : 'must be full'}
                            onFocus={() => handleFocus('email')}
                            value={user.email}
                            onChange={handleChange}
                            focused
                        />
                        <br />
                        <TextField sx={{ margin: 3, marginBottom: 0 }}
                            id="address"
                            label="address"
                            color={(isAddressValid) ? 'success' : 'warning'}
                            helperText={(isAddressValid) ? '' : 'must be full'}
                            onFocus={() => handleFocus('address')}
                            value={user.address}
                            onChange={handleChange}
                            focused
                        />
                        <br />
                        <TextField sx={{ margin: 3, marginBottom: 0 }}
                            id="phone"
                            label="phone"
                            color={(isPhoneValid) ? 'success' : 'warning'}
                            helperText={(isPhoneValid) ? '' : 'must be full'}
                            onFocus={() => handleFocus('phone')}
                            value={user.phone}
                            onChange={handleChange}
                            focused
                        />
                        <br />
                        <Button
                            sx={{ margin: 3 }}
                            type="submit" variant="contained" color="success"> update
                        </Button>

                    </form>
                </Card>

            }
            <Button
                sx={{
                    position: 'fixed',
                    left: 20,
                    bottom: 20,
                    zIndex: 1000
                }}
                variant="contained"
                color="success"
                onClick={handleClickLogOut}
            > logOut

            </Button>
        </>
    )
}
export default UpdateUser