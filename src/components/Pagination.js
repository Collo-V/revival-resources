import React,{useEffect, useState} from 'react';

function Pagination({pageNo,activePage,setActivePage}) {
    const [pages,setPages] = useState([1])
    useEffect(()=>{
        let tempPages = []
        for (let i=1;i<=pageNo;i++) {
            tempPages.push(i)
        }
        setPages(tempPages)
    },[pageNo])

    return (
        <div className="flex justify-end mt-10 gap-1">
            {
                activePage===1?
                    <button className="h-8 w-24 border-1px rounded-md bg-gray-200 dark:bg-gray-400" disabled={true}>
                        Previous
                    </button>
                    :
                    <button className="h-8 w-24 border-1px rounded-md bg-white dark:bg-slate-700 dark:text-white"  onClick={()=>{setActivePage(activePage-1)}}>
                        Previous
                    </button>
            }
            {
                pages.length<5?
                    <>
                        {
                            pages.map((value, index) => (
                                value === activePage?
                                    <button className="h-8 w-10 border-1px rounded border-primary text-primary bg-white dark:bg-slate-700 dark:text-white" key={index}>
                                        {value}
                                    </button>
                                    :
                                    <button className="h-8 w-10 border-1px rounded bg-white dark:bg-slate-700 dark:text-white" key={index} onClick={()=>{setActivePage(value)}}>
                                        {value}
                                    </button>
                            ))
                        }
                    </>
                    :
                    <>
                        {
                            activePage <4?
                                <>
                                    {
                                        pages.slice(0,4).map((value, index) => (
                                            value === activePage?
                                                <button className="h-8 w-10 border-1px rounded border-primary text-primary bg-white dark:bg-slate-700 dark:text-white" key={index}>
                                                    {value}
                                                </button>
                                                :
                                                <button className="h-8 w-10 border-1px rounded bg-white dark:bg-slate-700 dark:text-white" key={index} onClick={()=>{setActivePage(value)}}>
                                                    {value}
                                                </button>
                                        ))
                                    }
                                    ...
                                    {
                                        pages.slice(pages.length-1).map((value, index) => (
                                            value === activePage?
                                                <button className="h-8 w-10 border-1px rounded border-primary text-primary bg-white dark:bg-slate-700 dark:text-white" key={index}>
                                                    {value}
                                                </button>
                                                :
                                                <button className="h-8 w-10 border-1px rounded bg-white dark:bg-slate-700 dark:text-white" key={index} onClick={()=>{setActivePage(value)}}>
                                                    {value}
                                                </button>
                                        ))
                                    }
                                </>
                                :activePage >=pages.length-2?
                                    <>
                                        {
                                            pages.slice(0,1).map((value, index) => (
                                                value === activePage?
                                                    <button className="h-8 w-10 border-1px rounded border-primary text-primary bg-white dark:bg-slate-700 dark:text-white" key={index}>
                                                        {value}
                                                    </button>
                                                    :
                                                    <button className="h-8 w-10 border-1px rounded bg-white dark:bg-slate-700 dark:text-white" key={index} onClick={()=>{setActivePage(value)}}>
                                                        {value}
                                                    </button>
                                            ))
                                        }
                                        ...
                                        {
                                            pages.slice(pages.length-4).map((value, index) => (
                                                value === activePage?
                                                    <button className="h-8 w-10 border-1px rounded border-primary text-primary bg-white dark:bg-slate-700 dark:text-white" key={index}>
                                                        {value}
                                                    </button>
                                                    :
                                                    <button className="h-8 w-10 border-1px rounded bg-white dark:bg-slate-700 dark:text-white" key={index} onClick={()=>{setActivePage(value)}}>
                                                        {value}
                                                    </button>
                                            ))
                                        }

                                    </>
                                    :
                                    <>
                                        {
                                            pages.slice(0,1).map((value, index) => (
                                                value === activePage?
                                                    <button className="h-8 w-10 border-1px rounded border-primary text-primary bg-white dark:bg-slate-700 dark:text-white" key={index}>
                                                        {value}
                                                    </button>
                                                    :
                                                    <button className="h-8 w-10 border-1px rounded bg-white dark:bg-slate-700 dark:text-white" key={index} onClick={()=>{setActivePage(value)}}>
                                                        {value}
                                                    </button>
                                            ))
                                        }
                                        ...
                                        {
                                            pages.slice(activePage-2,activePage+1).map((value, index) => (
                                                value === activePage?
                                                    <button className="h-8 w-10 border-1px rounded border-primary text-primary bg-white dark:bg-slate-700 dark:text-white" key={index}>
                                                        {value}
                                                    </button>
                                                    :
                                                    <button className="h-8 w-10 border-1px rounded bg-white dark:bg-slate-700 dark:text-white" key={index} onClick={()=>{setActivePage(value)}}>
                                                        {value}
                                                    </button>
                                            ))
                                        }
                                        ...
                                        {
                                            pages.slice(pages.length-1).map((value, index) => (
                                                value === activePage?
                                                    <button className="h-8 w-10 border-1px rounded border-primary text-primary bg-white dark:bg-slate-700 dark:text-white" key={index}>
                                                        {value}
                                                    </button>
                                                    :
                                                    <button className="h-8 w-10 border-1px rounded bg-white dark:bg-slate-700 dark:text-white" key={index} onClick={()=>{setActivePage(value)}}>
                                                        {value}
                                                    </button>
                                            ))
                                        }

                                    </>

                        }
                    </>
            }
            {
                activePage===pages.length?
                    <button className="h-8 w-24 border-1px rounded-md bg-gray-200 dark:bg-gray-400" disabled={true}>
                        Next
                    </button>
                    :
                    <button className="h-8 w-24 border-1px rounded-md bg-white dark:bg-slate-700 dark:text-white" onClick={()=>{setActivePage(activePage+1)}}>
                        Next
                    </button>
            }


        </div>
    );
}

export default Pagination;
