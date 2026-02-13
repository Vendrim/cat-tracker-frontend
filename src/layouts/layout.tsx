import { Link } from 'react-router-dom'

export default function Layout(props: { children: React.JSX.Element }) {
    return (
        <>
            <nav className="menu-bar">
                <Link to="/home">
                    <span>Cat Tracker</span>
                </Link>
                <div className="profile-img">
                    <img src="src/assets/pfp.png"></img>
                </div>
            </nav>
            {props.children}
        </>
    )
}
