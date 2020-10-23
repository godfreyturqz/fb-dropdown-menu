import React, {useState} from 'react';
import { ReactComponent as Umbrella } from "./icons/umbrella.svg";
import { ReactComponent as SailingBoat } from "./icons/sailing-boat.svg";
import { ReactComponent as PalmTree } from "./icons/palm-tree.svg";
import { ReactComponent as SignBoard } from "./icons/signboard.svg";
import { ReactComponent as RoomKey } from "./icons/room-key.svg";
import { ReactComponent as PhotoAlbum } from "./icons/photo-album.svg";

import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      <Navitem icon={<Umbrella />}/>
      <Navitem icon={<SailingBoat />}/>
      <Navitem icon={<PalmTree />}/>

      {/* caret */}
      <Navitem icon={<SignBoard />} >
        <DropdownMenu />
      </Navitem>


    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function Navitem(props) {
  const [open, setOpen] = useState(false)

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={()=> setOpen(!open)}>{props.icon}</a>
      {open ? props.children : null}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main')
  const[menuHeight, setMenuHeight] = useState(null)

  function calcHeight(el){
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{height: menuHeight}} >
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        >
        <div className="menu">
          <DropdownItem leftIcon={<PhotoAlbum />}>My Profile</DropdownItem>
          <DropdownItem 
            leftIcon={<RoomKey />}
            rightIcon={<RoomKey />}
            goToMenu="settings"
            >Settings</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
        >
        <div className="menu">
          <DropdownItem leftIcon={<RoomKey />} goToMenu="main"/>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
