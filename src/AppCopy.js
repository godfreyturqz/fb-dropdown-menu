//note: practice only

import React, {useState} from 'react';
// for importing svg icons use ReactComponent
import { ReactComponent as Umbrella } from "./icons/umbrella.svg";
import { ReactComponent as SailingBoat } from "./icons/sailing-boat.svg";
import { ReactComponent as PalmTree } from "./icons/palm-tree.svg";
import { ReactComponent as SignBoard } from "./icons/signboard.svg";
import { ReactComponent as RoomKey } from "./icons/room-key.svg";
import { ReactComponent as PhotoAlbum } from "./icons/photo-album.svg";
//for animation
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar/>
  );
}

function Navbar() {
    const [open, setOpen] = useState(false)
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#" className="icon-button">{<Umbrella />}</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="icon-button">{<SailingBoat />}</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="icon-button">{<PalmTree />}</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="icon-button" onClick={()=> setOpen(!open)}>{<SignBoard />}</a>
                    {open ? <DropdownMenu /> : null}
                </li>
            </ul>
        </nav>
    );
}

function DropdownMenu() {
    const [menu, setMenu] = useState('main')
    const[menuHeight, setMenuHeight] = useState(null)

    function calcHeight(el){
        const height = el.offsetHeight
        setMenuHeight(height)
    }

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item" onClick={()=> props.goTo && setMenu(props.goTo)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    return (
        <div className="dropdown" style={{height: menuHeight}}>
            {/* main menu */}
            <CSSTransition
                in={menu === "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}
                >
                    <div className="menu">
                    <DropdownItem leftIcon={<PhotoAlbum/>}>My Profile</DropdownItem>
                    <DropdownItem 
                        leftIcon={<RoomKey/>}
                        rightIcon={<RoomKey/>}
                        goTo="settings"
                        >
                            Settings</DropdownItem>
                    </div>
            </CSSTransition>
            {/* settings menu */}
            <CSSTransition
                in={menu === "settings"}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
                >
                    <div className="menu">
                    <DropdownItem leftIcon={<RoomKey/>} goTo="main"></DropdownItem>
                    <DropdownItem>settings</DropdownItem>
                    <DropdownItem>settings</DropdownItem>
                    <DropdownItem>settings</DropdownItem>
                    <DropdownItem>settings</DropdownItem>
                    </div>
            </CSSTransition>
        </div>
    );
}

export default App;
