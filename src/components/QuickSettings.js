import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {writeDarkMode} from "../store/reducers/settings";
import {useDispatch, useSelector} from "react-redux";

function QuickSettings({show}) {
    const dispatch = useDispatch()
    const {darkMode} = useSelector(state => state.settings)
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
            show(false)
        },500)
    }
    const changeDarkMode = (show) => {
        dispatch(writeDarkMode(show))
    }

    return (
        <div className='fixed h-screen-h w-screen-w top-0 left-0 flex justify-end items-center pr-10 bg-gray-500/75 z-20' >
            <div className='h-screen-h-80 w-250px
         bg-white shadow-md z-20 bg-white dark:bg-slate-700 rounded-md animate__animated animate__fadeInRight' ref={wrapperRef}>
                <div className="flex justify-between p-4">
                    <h1 className='text-5'>Custom settings</h1>
                    <button className='h-10 w-10' onClick={hideEl}>
                        <FontAwesomeIcon icon={solid('xmark')} className='text-5'/>

                    </button>
                </div>
                <div className="p-4">
                    <div>
                        <h2 className="mb-4 border-b-1px font-semibold">Color Scheme</h2>
                        <div>
                            <div className="flex gap-1 mb-2 items-center">
                                {
                                    !darkMode?
                                        <button type='button' className=" w-10 h-5 rounded-pill border-1px border-primary" >
                                            <span className="block h-3 w-3 bg-primary rounded-full float-right mr-1"></span>
                                        </button>
                                        :
                                        <button type='button' className=" w-10 h-5 rounded-pill border-1px" onClick={()=>{changeDarkMode(false)}}>
                                            <span className="block h-3 w-3 bg-gray-300 rounded-full ml-1"></span>
                                        </button>
                                }
                                <span>Light mode</span>
                            </div>
                            <div className="flex gap-1 mb-2 items-center">
                                {
                                    darkMode?
                                        <button type='button' className=" w-10 h-5 rounded-pill border-1px border-primary" >
                                            <span className="block h-3 w-3 bg-primary rounded-full float-right mr-1"></span>
                                        </button>
                                        :
                                        <button type='button' className=" w-10 h-5 rounded-pill border-1px" onClick={()=>{changeDarkMode(true)}}>
                                            <span className="block h-3 w-3 bg-gray-300 rounded-full ml-1"></span>
                                        </button>
                                }
                                <span>Dark mode</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default QuickSettings;
