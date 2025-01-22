import { Outlet, useLocation, useNavigate } from 'react-router'
import Grid from '@mui/material/Grid2'
import User from './user/User'
import NavBar from './recipes/NavBar'
import { useEffect, useReducer, useState } from 'react'
import { initialState, UserContext, userReducer } from '../userReducer'
import { Recipe } from './recipes/AllRecipes'
import ShowRecipe from './recipes/ShowRecipe'
const AppLayout = () => {
    const [user, userDispach] = useReducer(userReducer, initialState)
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    useEffect(() => {
        navigate('/')
    }, [navigate])
    const handleRecipeClick = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    return (
        <UserContext.Provider value={{ state: user, dispatch: userDispach }}>
            <Grid container >
                <Grid size={2} sx={{ margin: 2 }}>
                    <User />
                    {(location.pathname === '/AllRecipes') ?
                        (<ShowRecipe selectedRecipe={selectedRecipe} />) : (<div></div>)}
                </Grid>
                <Grid size={7} sx={{ margin: 2 }}>
                    {location.pathname === '/' &&
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                            fontSize:'40px',
                            color:'white',
                            fontStyle:'italic',
                        }}>
                            <h1>Welcome!</h1>
                        </div>}

                </Grid>
                <Grid size={2} sx={{ margin: 2 }}>
                    <NavBar onLinkClick={() => setSelectedRecipe(null)} />
                    <Outlet context={{ handleRecipeClick, selectedRecipe }} />
                </Grid>

            </Grid>
        </UserContext.Provider>
    )
}
export default AppLayout
