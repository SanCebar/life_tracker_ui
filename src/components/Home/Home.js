import './Home.css';
import { Hero, Navbar } from "components";
import watchImg from "./fit_watch_transparent.png"

const bgImage =
    "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=717&q=80";

const heroText = "Take Control of Your Health"

export default function Home() {
    return (
        <div className="Home">
            <Navbar />
            <Hero heroText={heroText} bgImage={bgImage} />
            <div className="activities">
                
            </div>
        </div>
    )
}