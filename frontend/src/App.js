import './App.css';
import Navbar from './components/Navbar';
import Datascience from './pages/Datascience';
import Artificial from './pages/Artificial';


import Home from './pages/Lannding/Home';
import AboutUs from './pages/AbtUs/AboutUs';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import ForgotPwd from './pages/ForgotPwd/ForgotPwd';
import ChangePassword from './components/ForgotPassword/ChangePassword';


import Cyber_Security from './pages/Cyber_Security'
import Data_Science from './pages/Data_Science'

import BlockChain from './pages/BlockChain'
import Cloud_Computing from './pages/Cloud_Computing'
import DevOps from './pages/DevOps'
import Machine_Learning from './pages/Machine_Learning'
import Mobile_app_Dev from './pages/Mobile_app_Dev'
import Web_Development from './pages/Web_Development'


import { BrowserRouter,Routes,Route } from "react-router-dom";
import Admin from './pages/Admin/Admin';
import Admin1 from './pages/Admin/Admin1';
import AdminContent from './pages/Admin/AdminContent';
import UnderNav_Bar from './components/UnderNav_Bar';
import UnderProfile from './components/UnderProfile';
import Chat from './components/Chat';
import UnderGraduate from './pages/UnderGraduate';
import UndergraduateChat from './pages/UndergraduateChat';
import UserFeed from './pages/UserFeed';
import UserHome from './pages/UserHome';
import ExpertNav_Bar from './components/ExpertNav_Bar';
import ExpertFeed from './pages/ExpertFeed';
import ExpertHome from './pages/ExpertHome';
import ChatEx from './components/ChatEx';
import ExpertChat from './pages/ExpertChat';
import Advertistemen from './components/Advertistemen';
import CreatePost from './components/CreatePost';
import ExpertProfile from './components/ExpertProfile';
import Expert from './pages/Expert';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/Datascience" element={<Datascience/>} />
     

         
          <Route path="/Signup" element={<SignUp></SignUp>}></Route>
          <Route path="/Login" element={<Login></Login>} ></Route>
          <Route path="/ForgotPassword" element={<ForgotPwd></ForgotPwd>}></Route>
          <Route path="/ChangePassword/:id/:token" element={<ChangePassword></ChangePassword>}></Route>
     

          <Route path="/Cyber_Security" element={<Cyber_Security></Cyber_Security>} ></Route>
          <Route path="/Data_Science" element={<Data_Science></Data_Science>} ></Route>
          <Route path="/Artificial" element={<Artificial></Artificial>} ></Route>
          <Route path="/BlockChain" element={<BlockChain></BlockChain>} ></Route>
          <Route path="/Cloud_Computing" element={<Cloud_Computing></Cloud_Computing>} ></Route>
          <Route path="/DevOps" element={<DevOps></DevOps>} ></Route>
          <Route path="/Machine_Learning" element={<Machine_Learning></Machine_Learning>} ></Route>
          <Route path="/Mobile_app_Dev" element={<Mobile_app_Dev></Mobile_app_Dev>} ></Route>
          <Route path="/Web_Development" element={<Web_Development></Web_Development>} ></Route>
         

          <Route path='/Admin' element={<Admin></Admin>}></Route>
          <Route path="/AdminEx" element={<Admin1></Admin1>}></Route>
          <Route path="/AdminContent" element={<AdminContent></AdminContent>}></Route>
          <Route path="/Undergraduate" element={<UnderGraduate></UnderGraduate>}></Route>
          <Route path="/Undergraduatechat" element={<UndergraduateChat></UndergraduateChat>}></Route>
          <Route path="/feed" element={<UserFeed></UserFeed>}></Route>
          <Route path="/Home" element={<UserHome></UserHome>}></Route>


          <Route path="/nav" element={<ExpertNav_Bar></ExpertNav_Bar>}></Route>
          <Route path="/chatEx" element={<ExpertChat></ExpertChat>}></Route>
          <Route path="/feedEx" element={<ExpertFeed></ExpertFeed>}></Route>
          <Route path="/homeEx" element={<ExpertHome></ExpertHome>}></Route>
          <Route path="/profileEx" element={<Expert></Expert>}></Route>

          
          
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}


export default App;
