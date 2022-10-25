import React, {useEffect, useState} from 'react';
import AddBook from "../components/AddBook";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

function Books(props) {
    const [showAddBook,setShowAddBook] = useState(false)
    const [bookList,setBookList] = useState([])
    const [selectedCat,setSelectedCat] = useState('')
    const [selectedAuthor,setSelectedAuthor] = useState('')
    const {books,categories,authors} = useSelector(state => state.books)
    const expandFilter = (id) => {
        document.getElementById(id).classList.toggle('expanded-filter')
    }
    useEffect(()=>{
        if(books){
            setBookList(Object.values(books))
        }

    },[books])
    return (
        <div className='p-8'>

            {
                showAddBook &&
                <AddBook change={setShowAddBook}/>
            }
            <div className="flex justify-between">
                <h1 className='text-6'>Books list</h1>
                <button className="w-150px h-8 rounded-md flex gap-1 items-center justify-center bg-primary text-white" onClick={()=>{setShowAddBook(true)}}>
                    Add product
                </button>

            </div>
            <div className='mt-4 border-t-1px pt-4 flex flex-col lg:flex-row gap-10'>
                <div className='w-full lg:min-w-400px lg:w-400px grid gap-4 h-fit'>
                    <div className="flex items-center border-1px rounded-md justify-between p-4 bg-white dark:bg-slate-700 dark:text-white">
                        <span className="font-semibold text-5">Filter</span>
                        <button className="h-8 w-24 rounded-md bg-primary text-white"
                                onClick={()=>{setSelectedAuthor('');setSelectedCat('')}}
                        >
                            Reset
                        </button>
                    </div>
                    <div className='border-1px p-4 rounded-md dropdown-cont cursor-pointer bg-white dark:bg-slate-700 dark:text-white'>
                        <div className="flex items-center justify-between" onClick={()=>{expandFilter('filter-cat')}} id='filter-cat'>
                            <span className="font-semibold text-5">Categories</span>
                            <span className="capitalize">{selectedCat}</span>
                            <button className="h-8 w-24 text-right" >
                                <FontAwesomeIcon icon={solid('angle-down')}/>
                            </button>
                        </div>
                        <div className="filter-options grid hidden">
                            {
                                categories.map(cat=>(
                                    <span className='py-2 hover:text-primary cursor-pointer capitalize' key={cat}
                                          onClick={()=>{setSelectedCat(cat);expandFilter('filter-cat')}}
                                    >
                                        {cat}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className='border-1px p-4 rounded-md dropdown-cont cursor-pointer bg-white dark:bg-slate-700 dark:text-white'>
                        <div className="flex items-center justify-between" onClick={()=>{expandFilter('filter-brand')}} id='filter-brand'>
                            <span className="font-semibold text-5">Brands</span>
                            <span className="capitalize">{selectedAuthor}</span>
                            <button className="h-8 w-24 text-right" >
                                <FontAwesomeIcon icon={solid('angle-down')}/>
                            </button>
                        </div>
                        <div className="filter-options grid hidden">
                            {
                                authors.map(author=>(
                                    <span className='py-2 hover:text-primary cursor-pointer capitalize' key={author}
                                          onClick={()=>{setSelectedAuthor(author);expandFilter('filter-brand')}}
                                    >
                                        {author}
                                    </span>
                                ))
                            }
                        </div>
                    </div>


                </div>
                <div className='w-full'>
                    {
                        bookList.map(book=>(
                            <div className='p-4 bg-white mb-4 rounded md' key={book.id}>
                                {book.title}
                            </div>
                        ))
                    }

                </div>



            </div>
        </div>
    );
}

export default Books;
