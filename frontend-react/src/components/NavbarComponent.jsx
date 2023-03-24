import React from 'react'


// importing routes from react-router-dom
import { Link, Outlet } from 'react-router-dom';

import NavbarConfig from '../static/js/navbar';

export default function NavbarComponent() {
    React.useEffect(() => NavbarConfig())
    return (
        <nav className='navbar navbar-dark flex-nowrap justify-start' id='mainNav'>
            <div className='container h-[66px] mx-auto flex justify-between flex-nowrap items-center !px-6 lg:!px-12'>
                <a className='navbar-brand text-white font-extrabold no-underline'>Art Blog</a>
                <div className="hidden h-[66px] lg:!flex lg:basis-auto flex-grow align-middle">
                    <ul className='navbar-nav !ml-auto !py-6 lg:flex-row lg:!py-0'>
                        { [
                            [ 'Home', '/' ],
                            [ 'Post', '/post/viewpost' ],
                            [ 'About', '/user/login' ]
                        ].map(([ nav_name, nav_link ]) =>
                            <li className='nav-item'>
                                <Link className='nav-link lg:!px-4 py-4 lg:!py-6' to={ nav_link }>{ nav_name }</Link>
                            </li>
                        ) }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
