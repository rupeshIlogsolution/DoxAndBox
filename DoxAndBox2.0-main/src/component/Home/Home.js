import React from 'react';
import Navbar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';
import './Home.css';



function Home() {
    const [on, setOn] = React.useState(false);

    const handleOn = () => {
      setOn(!on);
    };
  return (
    <div>
        
        <aside className={on ? 'to-right' : ''}>
          

        <a href="#" onClick={handleOn}>
          Click
        </a>

        <h1>React Sidebar</h1>
      </aside>
      {on && <SideBar openClass="open" />}

      <nav className="Navbar">
                <ul style={{border:"1px solid red"}}>
                    <li>Button</li>
                    <li>Dox And Box</li>
                    <li>Account</li>
                </ul>
            </nav>
      
    </div>
  )
}

export default Home
