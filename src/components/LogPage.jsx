import { useNavigate } from "react-router-dom";
import "./CSS/log.css";


export default function LogPage (){
    const navigateTo = useNavigate();
    return (
        <div className="logcontainer">
          <h1 className="logtitle">Welcome to Our Platform</h1>
          <div className="logcards">
            <div className="logcard">
              <h2>Dashboard Login</h2>
              <p>Access the admin to manage your content.</p>
              <button className="logbutton" onClick={() => navigateTo("/dlogin")}>Go to Dashboard</button>
            </div>
            <div className="logcard">
              <h2>E-Learning Login</h2>
              <p>Log in to explore courses, resources, and your learning journey.</p>
              <button className= "logbutton" onClick={() => navigateTo("/elogin")}>Go to E-Learning</button>
            </div>
          </div>
        </div>
    )
}