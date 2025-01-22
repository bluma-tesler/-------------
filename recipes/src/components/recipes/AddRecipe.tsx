import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "../../userReducer";
import { Navigate, useNavigate } from "react-router";
import { Button, Card, TextField } from "@mui/material";


const AddRecipe = () => {
    const { state: user } = useContext(UserContext);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const detailsRef = useRef<HTMLInputElement>(null);
    const [bool, setBool] = useState<boolean | null>(true)

    const navigate = useNavigate();
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isDetailsValid, setIsDetailsValid] = useState(true);
    if (!user.email) {
        return <Navigate to="/error" />
    }
    const handleRecipe = async (e: FormEvent<HTMLFormElement>, isBool: boolean | null) => {

        e.preventDefault()

        const title = titleRef.current?.value
        const description = descriptionRef.current?.value
        const details = detailsRef.current?.value


        setIsTitleValid(!!title)
        setIsDescriptionValid(!!description)
        setIsDetailsValid(!!details)

        if (!title || !description || !details) {
            return
        }

        try {
            const response = await fetch('http://localhost:3000/api/recipes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': `${user.id}`,
                    'access-control-allow-origin': '*',
                },
                body: JSON.stringify({
                    title: titleRef.current?.value,
                    description: descriptionRef.current?.value,
                    details: detailsRef.current?.value,

                }),
            });
            if (!response.ok) {
                throw new Error(`fetch error ${response.status}`)
            }
            alert('המתכון נוסף בהצלחה')
            if (isBool === true) {
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        } finally {
            titleRef.current!.value = '';
            descriptionRef.current!.value = '';
            detailsRef.current!.value = '';
        }

    };

    const handleFocus = (field: 'title' | 'description' | 'details') => {
        if (field === 'title') {
            setIsTitleValid(true)
            console.log('title');
        }
        else if (field === 'description') { setIsDescriptionValid(true) }
        else if (field === 'details') { setIsDetailsValid(true) }
    };

    return (
        <>
            <Card sx={{ maxWidth: 250 }}>
                <form onSubmit={(e) => handleRecipe(e, bool)}>
                    <TextField sx={{ margin: 3, marginBottom: 0 }}
                        id="outlined"
                        label="title"
                        color={(isTitleValid) ? 'success' : 'warning'}
                        helperText={(isTitleValid) ? '' : 'must be full'}
                        inputRef={titleRef}
                        onFocus={() => handleFocus('title')}
                        focused
                    />
                    <TextField sx={{ margin: 3, marginBottom: 0 }}
                        id="outlined"
                        label="description"
                        color={(isDescriptionValid) ? 'success' : 'warning'}
                        helperText={(isDescriptionValid) ? '' : 'must be full'}
                        inputRef={descriptionRef}
                        onFocus={() => handleFocus('description')}
                        focused
                    />
                    <TextField sx={{ margin: 3, marginBottom: 0 }}
                        id="outlined"
                        label="details"
                        color={(isDetailsValid) ? 'success' : 'warning'}
                        helperText={(isDetailsValid) ? '' : 'must be full'}
                        inputRef={detailsRef}
                        onFocus={() => handleFocus('details')}

                        focused
                    />
                    <br />
                    <Button
                        sx={{ margin: 3 }}
                        type="submit"
                        variant="contained"
                        color="success"
                        onClick={() => setBool(true)}> הוספת מתכון
                    </Button>
                    <Button
                        sx={{ margin: 3 }}
                        type="submit"
                        variant="contained"
                        color="success"
                        onClick={() => setBool(false)}>  שמירה והוספת מתכון נוסף
                    </Button>
                </form>
            </Card>
        </>
    )
}
export default AddRecipe