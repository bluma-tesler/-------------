import { Link } from "react-router"
const NavBar=({onLinkClick}:{onLinkClick:()=>void})=>{
return(
    <>
    <nav style={{color:'green', fontSize:'25px'}}>
<Link style={{color:'green', fontSize:'23px'}} to='/'>Home</Link> | 
<Link  style={{color:'green', fontSize:'23px'}} onClick={onLinkClick} to='/AllRecipes'> Allrecipes</Link> | 
<Link style={{color:'green', fontSize:'23px'}} to='/AddRecipe'> Addrecipe</Link>
    </nav>
    </>
)
}
export default NavBar