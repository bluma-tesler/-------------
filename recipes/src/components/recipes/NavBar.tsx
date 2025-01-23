import { Link } from "react-router"
const NavBar = ({ onLinkClick }: { onLinkClick: () => void }) => {
    return (
        <div style={{ backgroundColor: "green", borderRadius: 5, maxWidth: 280 }}>
            <nav style={{ color: 'white', fontSize: '25px' }}>
                <Link style={{ color: 'white', fontSize: '20px' }} to='/'>Home</Link> |
                <Link style={{ color: 'white', fontSize: '20px' }} onClick={onLinkClick} to='/AllRecipes'> Allrecipes</Link> |
                <Link style={{ color: 'white', fontSize: '20px' }} to='/AddRecipe'> Addrecipe</Link>
            </nav>
        </div>
    )
}
export default NavBar