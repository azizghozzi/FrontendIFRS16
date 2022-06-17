import React from 'react'
import '../Dashbord/Dashbord.css';
import Charts from '../charts/charts';
import { useSelector } from 'react-redux';
import {selectUser} from '../../features/userSlice'
const Home = ({logged}) => {
  //  const [Creat_utilisateur, setCreat_utilisateur] = useState(false);  
    //const hideModal = () => setCreat_utilisateur(false);
    const user = useSelector(selectUser)

  return (
    <div className='ytur'>
    { user.type === 0 || user.type === 1
    ?
      <Charts/>:
      <></>
    }
    </div>
  
  
  )
}

export default Home
