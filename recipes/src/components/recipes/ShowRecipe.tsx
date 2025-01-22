
import { Recipe } from "./AllRecipes"
import { Box } from "@mui/material"
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
const ShowRecipe = ({ selectedRecipe }: { selectedRecipe: Recipe | null }) => {

    return (<>
        {selectedRecipe ?
            (
                <Box
                    sx={{
                        width: 400,
                        maxHeight: '100vh',
                        borderRadius: 2,
                        border: '1mm solid black',
                        bgcolor: '#e0f7fa',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>

                    <DinnerDiningIcon
                        sx={{
                            fontSize: 60,
                            color: "#00bcd4",
                            marginTop: 2,
                            marginBottom: 0,
                        }}
                    />
                    <br />
                    <h1>{selectedRecipe.title}</h1>
                    <br />
                    <h3>{selectedRecipe.description}</h3>
                    <br />
                    <h5>{selectedRecipe.details}</h5>
                </Box>
            )

            :
            (
                <Box
                    sx={{
                        width: 400,
                        height: 400,
                        borderRadius: 2,
                        border: '1mm solid black',
                        bgcolor: '#e0f7fa',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>

                    <h1>בחר מתכון להצגה</h1>
                </Box>
            )
        }




    </>)
}
export default ShowRecipe