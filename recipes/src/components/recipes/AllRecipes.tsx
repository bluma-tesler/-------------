import { useEffect, useState } from "react"
import { Box, ImageList, ImageListItem, Typography } from "@mui/material"
import { useOutletContext } from "react-router";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';


export type Recipe = {
    id: number;
    title: string;
    description: string;
    details: string;
}
const AllRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { handleRecipeClick } = useOutletContext<{ handleRecipeClick: (recipe: Recipe) => void }>()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const GetRecipes = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3000/api/recipes");
                if (!response.ok) {
                    throw new Error(`Error fetching recipes: ${response.status}`);
                }
                const data = await response.json();
                setRecipes(data);
            } catch (err) {
                setError("Error fetching recipes");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        GetRecipes();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <>
            <ImageList sx={{ width: 400, height: 500 }} cols={2} rowHeight={164}>
                {recipes.map((recipe) => (
                    <ImageListItem key={recipe.id}>
                        <Box onClick={() => handleRecipeClick(recipe)}
                            sx={{
                                width: 180,
                                minHeight: 180,
                                borderRadius: 1,
                                border: '0.6mm solid black',
                                bgcolor: '#e0f7fa',
                                transition: 'bgcolor 0.3s ease',

                                '&:hover': {
                                    bgcolor: 'white',
                                },

                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}>

                            <DinnerDiningIcon
                                sx={{
                                    fontSize: 45,
                                    color: "#00bcd4",
                                    marginTop: 2,
                                    marginBottom: 0,
                                }}
                            />
                            <br />
                            <h4>{recipe.title}</h4>
                        </Box>
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}
export default AllRecipes