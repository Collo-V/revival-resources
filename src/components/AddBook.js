import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {message} from "../commons/swal";
import {useSelector} from "react-redux";
import {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../assets/styles/books.css'
import {getDocs,setDoc,doc} from 'firebase/firestore'
import {books, db} from "../firebase";


const toolbar = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
]

function AddBook({change}) {
    const {deletedIds} = useSelector(state => state.books)
    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('')
    const [subCategory,setSubCategory] = useState('')
    const [author,setAuthor] = useState('')
    const [chapters,setChapters] = useState([])
    const [tempChapterTitle,setTempChapterTitle] = useState('')
    const [tempQuill,setTempQuill] = useState('')
    const [nextChapterTitle,setNextChapterTitle] = useState('')
    const [nextChapterContent,setNextChapterContent] = useState('')
    const formIsValid = (id)=>{
        let form = document.getElementById(id)
        let inputs = form.getElementsByTagName('input')
        let textarea = form.getElementsByTagName('textarea')
        inputs = [].slice.call(inputs).concat([].slice.call(textarea))
        for (let i = 0; i < inputs.length; i++) {
            let input =inputs[i]
            if(input.classList.contains('required')){
                if(input.value === ''){
                    input.classList.add('input-invalid')
                }else {
                    input.classList.remove('input-invalid')
                }
            }
        }
        let invalids = form.getElementsByClassName('input-invalid')
        if(invalids.length>0){
            invalids[0].focus()
            return  false
        }
        return true
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
    const saveBook = async (event) => {
        event.preventDefault()
        if(!formIsValid('prod-form'))return
        let bookId
        try{
            if(deletedIds.length>0){
                bookId = deletedIds[0]
            }else {
                let totalBooks = (await getDocs(books)).docs.length
                console.log(totalBooks)
                bookId = "book-"+`00${totalBooks+1}`.slice(-3)
            }
            console.log(chapters)
            await setDoc(doc(db,'books',bookId),{
                title,
                author,
                category,
                subCategory,
                dateAdded:new Date().getTime(),
                content:chapters
            })
            message({icon:'success',title:'Book saved successfully'})
            change(false)
        }catch (e) {
            message({icon:'error',title:'An error occurred'})
            console.log(e)

        }

        setTimeout(
            ()=>{
            },1000
        )
    }
    const hideEl = () => {
        wrapperRef.current.classList.replace('animate__fadeInRight','animate__fadeOutRight')
        setTimeout(()=>{
            change(false)
        },500)
    }
    const expandChapter = (index) => {
        let chapter = document.getElementById('chapter-'+index)
        let nextChapter = document.getElementById('next-chapter-cont')
        if(!chapter.classList.contains('expanded-chapter')){
            let expands = document.getElementsByClassName('expanded-chapter')
            for (let i = 0; i < expands.length; i++) {
                expands[i].classList.remove('expanded-chapter')
            }
            chapter.classList.add('expanded-chapter')
            let contentCont = document.getElementById('chapter-'+index+'-content')
            if(contentCont.children.length === 0 ){
                let quill = new Quill(contentCont, {
                    modules: {
                        toolbar
                    },
                    placeholder: 'Enter chapter content...',
                    theme: 'snow'  // or 'bubble'
                })
                let curQuill = chapters[index]
                quill.setContents(curQuill.content)
                setTempChapterTitle(curQuill.title)
                setTempQuill(quill)

            }
            nextChapter.classList.add('hidden')
        }else {
            chapter.classList.remove('expanded-chapter')
            nextChapter.classList.remove('hidden')
        }

    }
    useEffect(()=>{
        let contentCont = document.getElementById('next-chapter-content')
        if(contentCont.children.length === 0 ){
            let quill = new Quill(contentCont, {
                modules: {
                    toolbar
                },
                placeholder: 'Enter chapter content...',
                theme: 'snow'  // or 'bubble'
            })
            setNextChapterContent(quill)
        }
    },[])
    const saveChapter = (index) => {
        let edit = typeof (index) === 'number'
        let contId = edit? 'chapter-'+index+'-form':'next-chapter-cont'
        if (formIsValid(contId)){
            let tempChapters = chapters
            if(!edit){
                let tempChapter = {
                    title:nextChapterTitle,
                    content: nextChapterContent.getContents().ops
                }
                tempChapters = [...tempChapters,tempChapter]
                setNextChapterTitle('')
                let quill = nextChapterContent
                quill.setContents([])
                setNextChapterContent(quill)
            }else {
                let quill = tempQuill
                console.log(quill)
                let tempChapter = {
                    title:tempChapterTitle,
                    content: quill.getContents().ops
                }
                tempChapters[index] = tempChapter
            }
            setChapters(tempChapters)
            if(edit){
                expandChapter(index)
            }


        }

    }
    useEffect(()=>{
        // let divs = document.getElementsByClassName('book-chapter-cont')

        // function makeDraggable(id){
        //     dragElement(document.getElementById(id));
        // }
        function dragElement(elmnt) { var pos1 = 0, pos2 = 0, pos3 = 0,
            pos4 = 0; if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + '-title').onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:

            elmnt.onmousedown = dragMouseDown;
        }
            function dragMouseDown(e) {
                e = e ||window.event; e.preventDefault();
                // get the mouse cursor position at
                startup: pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
            function elementDrag(e) { e = e || window.event;
                e.preventDefault();
                elmnt.classList.add('absolute','w-full')
                // calculate the new cursor position:
                pos1 = pos3 -e.clientX; pos2 = pos4 - e.clientY;
                pos3 = e.clientX; pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop- pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft -pos1) + "px";
            }
            function closeDragElement() {
                // stop moving when mouse button is released:
                elmnt.classList.remove('absolute')
                elmnt.style.width = null
                document.onmouseup = null; document.onmousemove = null;
            }}
    },[chapters])

    return (
        <div className='fixed w-full h-screen-h flex justify-end bg-gray-500/75 top-0 left-0 z-20 overflow-hidden'>
            <div className="h-full w-full lg:w-75% 2xl:w-50% lg:min-w-500px bg-white dark:bg-slate-700 dark:text-white animate__animated animate__fadeInRight flex flex-col" ref={wrapperRef}>
                <div className="h-16 min-h-16 flex items-center justify-between px-4 bg-slate-100  dark:bg-gray-500">
                    <div className=''>
                        <h1 className="text-5">Add book</h1>
                    </div>
                    <button className="h-10 w-10 bg-white dark:bg-slate-700 dark:text-white shadow-md rounded-full" onClick={hideEl}>
                        <FontAwesomeIcon icon={solid('xmark')}/>
                    </button>
                </div>
                <div className='h-full overflow-y-auto pb-10'>
                    <form id='prod-form' >

                        <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                            <div className="col-span-1 font-semibold ">
                                Book name
                            </div>
                            <div className="col-span-2 max-w-full">
                                <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500'
                                       value={title}
                                       onChange={(event) => setTitle(event.target.value)}
                                />

                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                            <div className="col-span-1 font-semibold ">
                                Book category
                            </div>
                            <div className="col-span-2 max-w-full">
                                <div className="relative">
                                    <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500 mt-2'
                                           value={category}
                                           onChange={(event) => setCategory(event.target.value)}
                                    />
                                    <div className="absolute top-full shadow-md left-0 right-0">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                            <div className="col-span-1 font-semibold ">
                                Book subcategory
                            </div>
                            <div className="col-span-2 max-w-full">
                                <div className="relative">
                                    <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500 mt-2'
                                           value={subCategory}
                                           onChange={(event) => setSubCategory(event.target.value)}
                                    />
                                    <div className="absolute top-full shadow-md left-0 right-0">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                            <div className="col-span-1 font-semibold ">
                                Book author
                            </div>
                            <div className="col-span-2 max-w-full">
                                <div className="relative">
                                    <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500 mt-2'
                                           value={author}
                                           onChange={(event) => setAuthor(event.target.value)}
                                    />
                                    <div className="absolute top-full shadow-md left-0 right-0">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        <div className="grid lg:grid-cols-3 p-4 gap-1 mb-8">
                            <div className="col-span-1 font-semibold ">
                                Book content
                            </div>
                            <div className="col-span-2 max-w-full" >
                                <ul className='list-none relative'>
                                    {
                                        chapters.map((chapter,index)=>(
                                            <li key={index} className='book-chapter-cont mb-2 shadow-md border-t-1px rounded-md' id={'chapter-'+index}>
                                                <div className='font-semibold cursor-pointer p-4 chapter-title' onClick={()=>{expandChapter(index)}} id={'chapter-'+index+'-title'}>
                                                    {chapter.title}
                                                </div>
                                                <div className="chapter-cont p-4 " id={'chapter-'+index+'-form'}>
                                                    <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500 mt-2'
                                                           value={tempChapterTitle}
                                                           onChange={(event) => setTempChapterTitle(event.target.value)}
                                                    />
                                                    <div className='chapter-content mt-2'>
                                                        <div className='w-full' id={'chapter-'+index+'-content'}>

                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex justify-end">
                                                    <span className='w-fit dropdown-cont relative'>
                                                        <button type='button' className="w-8 h-8 rounded-full bg-primary  text-white"
                                                                onClick={()=>{saveChapter(index)}}  title='save chapter'
                                                        >
                                                            <FontAwesomeIcon icon={solid('plus')}/>
                                                        </button>
                                                        <div className="absolute h-8 w-fit right-full top-50% v-center flex items-center mr-2 rounded-md
                                                         p-2 pr-4 dropdown whitespace-nowrap bg-gray-400 dark:bg-gray-700 text-white shadow-md">
                                                            <span>
                                                                Save chapter
                                                            </span>
                                                            <div className="absolute left-full top-50% v-center">
                                                                <div className="h-2 w-2 rotate-45 bg-gray-400 dark:bg-gray-700 -ml-1"></div>
                                                            </div>

                                                        </div>
                                                    </span>

                                                    </div>
                                                </div>

                                            </li>

                                        ))
                                    }

                                </ul>
                                <div className='mb-2 shadow-md border-t-1px rounded-md' id='next-chapter-cont'>
                                    <div className="p-4 ">
                                        <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500 mt-2'
                                               value={nextChapterTitle}
                                               onChange={(event) => setNextChapterTitle(event.target.value)}
                                        />
                                        <div className='mt-2'>
                                            <div className='w-full' id='next-chapter-content'>

                                            </div>
                                        </div>
                                        <div className="mt-2 flex justify-end">
                                                    <span className='w-fit dropdown-cont relative'>
                                                        <button type='button' className="w-8 h-8 rounded-full bg-primary  text-white"
                                                                onClick={()=>{saveChapter()}}  title='save chapter'
                                                        >
                                                            <FontAwesomeIcon icon={solid('plus')}/>
                                                        </button>
                                                        <div className="absolute h-8 w-fit right-full top-50% v-center flex items-center mr-2 rounded-md
                                                         p-2 pr-4 dropdown whitespace-nowrap bg-gray-400 dark:bg-gray-700 text-white shadow-md">
                                                            <span>
                                                                Save chapter
                                                            </span>
                                                            <div className="absolute left-full top-50% v-center">
                                                                <div className="h-2 w-2 rotate-45 bg-gray-400 dark:bg-gray-700 -ml-1"></div>
                                                            </div>

                                                        </div>
                                                    </span>

                                        </div>
                                    </div>

                                </div>



                            </div>
                        </div>
                        <div className="flex justify-end gap-4 px-4">
                            <button type='button' className="w-150px h-8 rounded-md flex gap-1 items-center justify-center bg-slate-100  dark:bg-gray-400" onClick={hideEl}>
                                Cancel
                            </button>
                            <button className="w-150px h-8 rounded-md flex gap-1 items-center justify-center bg-primary text-white" onClick={saveBook} >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddBook;
