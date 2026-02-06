import Logo from "./Logo";
import { classes } from "../../constants/layout/navbar";

export default function Navbar () {

    const {container, btn, logo} = classes
    return (
        <>
        
        <ul className={container}>
            <li className={logo}><Logo /></li>
            <li className={btn}>home</li>
            <li className={btn}>login</li>
        </ul>
        </>
    )
}