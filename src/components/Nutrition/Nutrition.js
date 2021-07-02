import { Link } from "react-router-dom"
import { useAuthContext } from "contexts/auth"
import { Navbar } from "components"
import "./Nutrition.css"

export default function Nutrition() {
    const {user} = useAuthContext()

    return (
        <>
        <Navbar />
        <div className="Activity">
            {Object.keys(user).length === 0 ?
                <>
                <h1>Unauthorized User</h1>
                <p>You can register for an account <Link to="/register">here</Link></p>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                </> 
                :
                <>
                <h1>Nutrition Feed</h1>
                <div className="activity-feed">
                    <div className="activity-box e">
                        <span className="e-minutes"> </span>
                    </div>
                    
                    <div className="activity-box n">
                        <span className="n-calories"> </span>
                    </div>
                </div>
                </>
            }
        </div>
        </>
    )
}