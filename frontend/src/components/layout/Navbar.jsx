import Logo from "./Logo";
import { classes } from "../../constants/layout/navbar";
import { NavLink } from "react-router-dom";

export default function Navbar () {

    const {container, btn, logo} = classes
    return (
        <>
        
        <nav className={container}>
            <NavLink to="/" className={logo} end><Logo /></NavLink>
            <NavLink to="/login" className={btn}>login</NavLink>
        </nav>
        </>
    )
}