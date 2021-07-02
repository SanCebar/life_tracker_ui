import './Hero.css';

const defaultBgImg = 
    "https://images.unsplash.com/photo-1597378609416-47cc937b294c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

export default function Hero({ heroText, bgImage }) {
    return (
        <div className="Hero">
            { heroText && (
                <span className="Hero-text">{heroText}</span>
            )}
            <img className="Hero-img" alt="" src={bgImage ? bgImage : defaultBgImg} />
        </div>
    )
}