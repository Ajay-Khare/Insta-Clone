import insta from '../img/insta.png';
import React from 'react';
import '../header/header.css'
// // import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';
// import 'tippy.js/themes/light.css';
// import 'tippy.js/animations/perspective.css';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    // const [toolTip, setToolTip] = useState(false)
    const navigator = useNavigate();
    // const toolTipHandler = (e) => {
    //     e.preventDefault();
    //     setToolTip(!toolTip)

    // }

    const logOutHandler = () => {
        sessionStorage.removeItem("accessToken")
        navigator("/")
    }


    return (
        <>
            <nav className="header">
                <div className="insta">
                    <img src={insta} alt="logo" />
                </div>
                <div className='searchBoxDiv'>
                    <input className='searchBox' type="text" placeholder="Search" />
                </div>
                <div className="buttons">
                    <form type="submit" className='navButtons'>
                        <button onClick={(e) => {
                            e.preventDefault();
                            navigator("/feeds")
                        }} style={{ cursor: "pointer" }} ><i class="fa fa-home" aria-hidden="true"></i></button>
                        <button style={{ cursor: "pointer" }}><i class="fa fa-commenting" aria-hidden="true"></i></button>
                        <button onClick={() => navigator("/form")} style={{ cursor: "pointer" }} ><i class="fa fa-plus-square" aria-hidden="true"></i></button>
                        <button style={{ cursor: "pointer" }}><i class="fa fa-compass" aria-hidden="true"></i></button>
                        <button style={{ cursor: "pointer" }}><i class="fa fa-heart" aria-hidden="true"></i></button>
                        {/* <Tippy theme='light'
                            animation="perspective"
                            visible={toolTip}
                            onClick={logOutHandler}
                            content={
                                <button style={{ cursor: "pointer" }}>Log Out</button>
                            }> */}
                        <button onClick={logOutHandler} style={{ cursor: "pointer" }}>

                            <i class="fa fa-user" aria-hidden="true"></i>

                        </button>

                        {/* </Tippy> */}
                        {/* <span className='logOut'>Log Out</span> */}
                    </form>

                </div>
            </nav>

        </>
    )
}
export default Header;