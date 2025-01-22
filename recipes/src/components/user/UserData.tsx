import { useContext } from "react"
import { UserContext } from "../../userReducer"
import UpdateUser from "./UpdateUser"
import { Avatar } from "@mui/material"

const UserData = () => {
    const { state: user } = useContext(UserContext)

    return (
        <>
            <Avatar
                sx={{
                    color: 'white',
                    bgcolor: 'green',
                    margin: 6,
                    marginBottom: 2,
                    marginTop: 2,
                    width: 70,
                    height: 70,
                    fontSize: '30px'
                }}>
                {user.firstName ? user.firstName[0] : user.email[0]}
            </Avatar>
            <UpdateUser />

        </>
    )

}
export default UserData