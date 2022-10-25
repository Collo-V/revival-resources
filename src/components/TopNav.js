import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import QuickSettings from "./QuickSettings";

function TopNav(props) {
    const navigate = useNavigate()
    const [showQuickSettings,setShowQuickSettings] =useState(false)
    const logout = () => {
    //    Logout
        navigate('/auth/login')
    }
    return (
        <div className='z-10'  id='top-nav'>
            {
                showQuickSettings &&
                <QuickSettings show={setShowQuickSettings}/>
            }
            <nav className='fixed h-16 flex justify-between items-center top-0 left-100px right-0 px-10 z-10'>
               <div></div>
                <div className='flex items-center gap-4'>
                    <div className='flex'>
                        <FontAwesomeIcon icon={solid('bell')} className='text-5'/>
                    </div>
                    <div>
                        <button onClick={()=>{setShowQuickSettings(!showQuickSettings)}}>
                            <FontAwesomeIcon icon={solid('gear')} className='text-5'/>
                        </button>
                    </div>
                    <div className='dropdown-cont relative'>
                        {/*<img src={require('../assets/images/avatar.png')} alt="" className='h-12'/>*/}
                        <button className='bg-white h-10 w-10 rounded-full bg-green-400/50'>
                            <FontAwesomeIcon icon={solid('user')} className='text-5'/>
                        </button>
                        <div className="dropdown w-150px rounded-md bg-white dark:bg-slate-700 dark:text-white shadow-md absolute top-full mt-1 h-150px right-0 flex flex-col gap-2 justify-between p-4">
                            <div className="absolute w-full h-2 bottom-full"></div>
                            <div></div>
                            <div className='border-t-1px'>
                                <button to='w-full h-8' onClick={logout}>
                                    <FontAwesomeIcon icon={solid('power-off')} className='mr-2'/>
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </nav>
        </div>
    );
}

export default TopNav;
