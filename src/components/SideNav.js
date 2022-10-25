import React, {useState,useEffect, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {NavLink,useLocation} from "react-router-dom";
function SideNav(props) {
    const location = useLocation()
    const pathName = location.pathname
    const [showDrawer,setShowDrawer] = useState(false)
    const links = [
        {
            name:'home',
            to:'/',
            icon:'gauge'
        } ,
        {
            name:'products',
            to:'/products',
            icon:'shopping-bag'
        },
        {
            name:'orders',
            to:'/orders',
            icon:'basket-shopping'
        } ,
        {
            name:'customers',
            to:'/customers',
            icon:'users'
        },
        {
            name:'settings',
            to:'/settings',
            icon:'gear'
        },
    ]
    const getClass = (path) => {
      let basic = 'flex flex-col flex flex-col gap-1 items-center'
        return path === pathName? basic+' text-primary':basic
    }
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    hideEl();
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef)


    const hideEl = () => {
        wrapperRef.current.classList.replace('animate__fadeInRight','animate__fadeOutRight')
        setTimeout(()=>{
            setShowDrawer(false)
        },500)
    }

    const MainNav = () => {
        return(
            <nav className="w-100px bg-slate-100 dark:bg-slate-700 border-r-1px min-h-screen-h p-4 z-10">
                <div className='mt-'>
                    <img src={require('../assets/images/favicon.ico')} alt="" className='mx-auto h-10 w-auto'/>
                </div>
                <ul className='mt-10'>
                    <li className="mb-4 ">
                        <NavLink to='/'  className={getClass('/')}  >
                            <FontAwesomeIcon icon={solid('gauge')} className='text-5'/>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className="mb-4 ">
                        <NavLink to='/products'  className={getClass('/products')}  >
                            <FontAwesomeIcon icon={solid('shopping-bag')} className='text-5'/>
                            <span>Products</span>
                        </NavLink>
                    </li>
                    <li className="mb-4 ">
                        <NavLink to='/orders' className={getClass('/orders')} >
                            <FontAwesomeIcon icon={solid('basket-shopping')} className='text-5'/>
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li className="mb-4 ">
                        <NavLink to='/customers' className={getClass('/customers')} >
                            <FontAwesomeIcon icon={solid('users')} className='text-5'/>
                            <span>Customers</span>
                        </NavLink>
                    </li>
                    <li className="mb-4 ">
                        <NavLink to='/settings' className={getClass('/settings')} >
                            <FontAwesomeIcon icon={solid('gear')} className='text-5'/>
                            <span>Settings</span>
                        </NavLink>
                    </li>

                </ul>
            </nav>
        )

    }

    return (
        <div id='side-nav'>
            <div className="hidden lg:block">
                <MainNav/>
            </div>
            <div className="lg:hidden relative z-1">
                {
                    !showDrawer &&
                    <button className="absolute top-0 left-0 h-10 w-10 bg-primary rounded-full m-2 z-10 text-white"
                            onClick={() => setShowDrawer(true)}>
                        <FontAwesomeIcon icon={solid('bars-staggered')}/>
                    </button>
                }
                {
                    showDrawer &&
                    <div className='z-2'>
                        <div ref={wrapperRef} className='w-fit' onClick={hideEl}>
                            <MainNav/>
                        </div>
                        <div className="absolute top-0 left-0 h-screen-h w-screen-w bg-gray-500/75 z-n1"></div>
                    </div>
                }
            </div>

        </div>
    );
}

export default SideNav;
