import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
        faFileLines,
        faFilePen,
        faUser,
        faGear,
        faRightFromBracket,
        faFile 
        
    } from "@fortawesome/free-solid-svg-icons";
    import { Link } from 'react-router-dom';
    import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';
import { setIsLoggedIn } from "../../features/miscslices";
import { useState } from 'react';
import {selectUser} from '../../features/userSlice'
import { useSelector } from 'react-redux';
/* import { useState } from 'react'; */
const Sidebar = ({active,logged})=>{
        const user = useSelector(selectUser)
        const user_nav=[
            {
              key: "Contract Management",
              url: "/contract-management",
              icon: <FontAwesomeIcon  icon={faFileLines} />,
          },
          {
              key: "Output Contact",
              url: "/output-contact",
              icon: <FontAwesomeIcon  icon={faFilePen} />,
          },
          {
              key: "Deadline Management",
              url: "/deadline-management",
              icon: <FontAwesomeIcon  icon={faFilePen} />,
          },
          
          ]
        
        const admin_nav=[
            {
              key: "Contract Management",
              url: "/contract-management",
              icon: <FontAwesomeIcon  icon={faFileLines} />,
          },
          {
              key: "Users Management",
              url: "/users-management",
              icon: <FontAwesomeIcon icon={faUser} />,
          },
          {
              key: "Output Contact",
              url: "/output-contact",
              icon: <FontAwesomeIcon  icon={faFilePen} />,
          },
          {
              key: "Deadline Management",
              url: "/deadline-management",
              icon: <FontAwesomeIcon  icon={faFilePen} />,
          },
          
          ]
          const super_admin_nav=[
            {
              key: "Dashbord",
              url: "/",
              icon: <FontAwesomeIcon  icon={faFileLines} />,
          },
          {
              key: "Accounts",
              url: "/accounts",
              icon: <FontAwesomeIcon icon={faUser} />,
          },
          {
              key: "Customers",
              url: "/Customers",
              icon: <FontAwesomeIcon  icon={faFilePen} />,
          },
          {
              key: "Reports",
              url: "/Reports",
              icon: <FontAwesomeIcon  icon={faFilePen} />,
          },
          {
            key: "Integrations",
            url: "/integrations",
            icon: <FontAwesomeIcon  icon={faFilePen} />,
        },
          
          ]
          const [nav_Links]=useState(user.type === 0 ? super_admin_nav: user.type === 1 ? admin_nav:user_nav) //bech ye5tar nav 7aseb chkoun mconecti

  /*   const navlinks=[
        {
            name:"Contracts Management",
            url:"#",
            icon:faFileLines
        },
        {
            name:"Users Management",
            url:"#",
            icon:faUser
        },
        {
            name:" Output Contracts",
            url:"#",
            icon:faFilePen
        },
        {
            name:"DEadline Contracts",
            url:"#",
            icon:faFilePen
        },
        {
            name:"Paramaitre",
            url:"#",
            icon:faGear
        },
        {
            name:"Déconnexion",
            url:"#",
            icon:faRightFromBracket
        }
    ] */
    const dispatch = useDispatch()
    const handleLogout=()=>{
        
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(false));
    }
  
    return(
        <div className={user.type==0?"sidebar sadmin"   :"sidebar"  }> 
      <ul>
        <div  className='split1'>
                <li >
                    <Link to="/">
                   
                        <div className="img">
                        <img className='big' id='big' alt="er"  src={
                            active?
                            require("../../assets/eyyy.png"):
                            require("../../assets/ez.png")
                            } /> 
                        
                        </div>
                    </Link>
                </li>
                {nav_Links.map((navItem,key)=>
                    <li key={key}>
                        <Link to={navItem.url}>
                            <span className="icon"> {navItem.icon} </span>
                            <span className="text">{navItem.key}</span>
                        </Link>
                    </li>
        )}
                
        </div>        
        <div className='split2'>
           { user.type !==0 ?
           
            <> 
            <li >
                  <div className='ligne'></div>
            </li>
            <li>
                <Link to="/paramaitre">
                    <span className="icon"><FontAwesomeIcon icon={faGear}/></span>
                    <span className="text">Paramaitre</span>
                </Link>
            </li>
            <li onClick={()=>handleLogout()}>
                <Link to="/login">
                    <span className="icon"><FontAwesomeIcon icon={faRightFromBracket}/></span>
                    <span className="text" >Déconnexion</span>
                </Link>
             </li>
             </>
             :
                <>
                    <li>
                        saved Reports
                    </li>
                    <li >
                        <div className='ligne'></div>
                    </li>
                    <li>
                        <Link to="/">
                            <span className="icon"><FontAwesomeIcon icon={faFile}/></span>
                            <span className="text">Current Month</span>
                        </Link>
                    </li>
                    <li >
                        <Link to="/">
                            <span className="icon"><FontAwesomeIcon icon={faFile}/></span>
                            <span className="text" >Last suarter</span>
                        </Link>
                    </li>
                    <li onClick={()=>handleLogout()}>
                        <Link to="/login">
                            <span className="icon"><FontAwesomeIcon icon={faFile}/></span>
                            <span className="text" >Last Year Sale</span>
                        </Link>
                    </li>
                </>
             
        }
        </div>
      </ul>
      </div>
    )
}
export default Sidebar