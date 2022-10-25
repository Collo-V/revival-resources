import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {message} from "../commons/swal";
import {useSelector} from "react-redux";
import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {NumberInput} from "./Inputs";

function AddProduct({change}) {
    const {brands, categories} = useSelector(state => state.products)
    const [images,setImages] = useState([])
    const [previewImages,setPreviewImages] = useState([])
    const [prodName,setProdName] = useState('')
    const [prodAlias,setProdAlias] = useState('')
    const [prodOverview,setProdOverview] = useState('')
    const [prodPrice,setProdPrice] = useState('')
    const [prodSpec,setProdSpec] = useState('')
    const [prodCont,setProdCont] = useState('')
    const [prodBrand,setProdBrand] = useState('')
    const [prodCategory,setProdCategory] = useState('')
    const [prodAvailbility,setProdAvailbility] = useState(true)
    const [otherBrand,setOtherBrand] = useState('')
    const [otherCategory,setOtherCategory] = useState('')
    const [productSpecs,setProductSpecs] = useState([])
    const formIsValid = (id)=>{
        let form = document.getElementById(id)
        let inputs = form.getElementsByTagName('input')
        let textarea = form.getElementsByTagName('textarea')
        inputs = [].slice.call(inputs).concat([].slice.call(textarea))
        for (let i = 0; i < inputs.length; i++) {
            let input =inputs[i]
            if(input.classList.contains('required')){
                console.log('here')
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
    const selectImage = () => {
        let input=document.createElement("input");
        input.type="file";
        input.accept=".jpeg,.png,.jpg"
        let files=[]
        input.onchange = e=>{
            files=e.target.files;
            setImages([files[0]])
        }
        input.click()

    }
    const handleDrop = (event) => {
        event.preventDefault()
        if (event.dataTransfer.items) {
            let  files = []
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                // If dropped items aren't files and image , reject them

                if (event.dataTransfer.items[i].kind === 'file') {
                    let file = event.dataTransfer.items[i].getAsFile()
                    if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')files.push(file)

                }
            }
            setImages(files.slice(0,3))
        }

    }
    const removeImg = (index) => {
        let tempImg = images.slice(0,index).concat(index+1)
        setImages(tempImg)
    }
    useEffect(()=>{
        if(images.length >= 0){
            let tempPreviews = []
            for (let i = 0; i < images.length; i++) {
                let file = images[i]
                if (file) {
                    let reader = new FileReader();
                    reader.onload = () => {
                        tempPreviews.push(reader.result)
                        setPreviewImages(tempPreviews)
                    }
                    reader.readAsDataURL(file);
                }
            }
        }

    },[images])
    const saveProduct = async (event) => {
        event.preventDefault()
        if(!formIsValid('prod-form'))return
    //  some validation
    //    Saving product
        setTimeout(
            ()=>{
                message({icon:'success',title:'product saved successfully'})
                change(false)
            },1000
        )
    }
    const hideEl = () => {
        wrapperRef.current.classList.replace('animate__fadeInRight','animate__fadeOutRight')
        setTimeout(()=>{
            change(false)
        },500)
    }
    useEffect(()=>{
        console.log('here')
    },[])
    useEffect(()=>{
        console.log('quill')
        let specsCont = document.getElementById('specs-cont')
        let boxCont = document.getElementById('box-cont')
        if(specsCont.children.length === 0 ){
            let quill = new Quill(specsCont, {
                modules: {
                    toolbar: [
                        {'list':'bullet'},
                        // ['italic', 'underline'],
                    ]
                },
                placeholder: 'Enter the specs...',
                theme: 'snow'  // or 'bubble'
            })
        }
        if(boxCont.children.length === 0 ){
            let quill = new Quill(boxCont, {
                modules: {
                    toolbar: [
                        {'list':'bullet'},
                        // ['italic', 'underline'],
                    ]
                },
                placeholder: 'Enter what is in the product box/container...',
                theme: 'snow'  // or 'bubble'
            })
        }
    },[])
    return (
        <div className='fixed w-full h-screen-h flex justify-end bg-gray-500/75 top-0 left-0 z-20 overflow-hidden'>
            <div className="h-full w-full lg:w-50% lg:min-w-500px bg-white dark:bg-slate-700 dark:text-white animate__animated animate__fadeInRight flex flex-col" ref={wrapperRef}>
                <div className="h-16 min-h-16 flex items-center justify-between px-4 bg-slate-100  dark:bg-gray-500">
                    <div className=''>
                        <h1 className="text-5">Add product</h1>
                    </div>
                    <button className="h-10 w-10 bg-white dark:bg-slate-700 dark:text-white shadow-md rounded-full" onClick={hideEl}>
                        <FontAwesomeIcon icon={solid('xmark')}/>
                    </button>
                </div>
                <form onSubmit={saveProduct} id='prod-form' className='h-full overflow-y-auto pb-10'>
                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                        <div className="col-span-1 font-semibold ">
                            Product image
                        </div>
                        <div className="col-span-2 max-w-full">
                            <div className="lg:h-32 py-2 border-dotted border-1 rounded-md flex items-center justify-center cursor-pointer"
                                 onDragOver={(event)=>{event.preventDefault()}}
                                 onDrop={handleDrop}
                                 onClick={selectImage}
                            >
                                <div className="h-fit text-center">
                                    <FontAwesomeIcon icon={solid("cloud-arrow-up")}/>
                                    <p className='my-2'>Select or drag your images here</p>
                                    <p className="italic text-gray-400">(Only *.jpeg,*.png and .*jpg images will be accepted)</p>
                                </div>

                            </div>
                            {
                                previewImages.length>0 &&
                                <div className="flex gap-4 mt-2">
                                    {
                                        previewImages.map((image,index)=>(
                                            <div key={index} className='w-100px h-100px border-1px rounded-md flex items-center justify-center relative dropdown-cont'>
                                                <img src={image} alt="" className='max-h-90% w-auto'/>
                                                <div className="dropdown absolute top-0 left-0 h-full w-full bg-gray-300/50">
                                                    <button className="w-10 h-10 float-right" onClick={()=>removeImg(index)}>
                                                        <FontAwesomeIcon icon={solid('trash-can')}/>
                                                    </button>

                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            }
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                        <div className="col-span-1 font-semibold ">
                            Product name
                        </div>
                        <div className="col-span-2 max-w-full">
                            <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500'
                                   value={prodName}
                                   onChange={(event) => setProdName(event.target.value)}
                            />

                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                        <div className="col-span-1 font-semibold ">
                            Product alias
                        </div>
                        <div className="col-span-2 max-w-full">
                            <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500'
                                   value={prodAlias}
                                   onChange={(event) => setProdAlias(event.target.value)}
                            />

                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                        <div className="col-span-1 font-semibold ">
                            Product category
                        </div>
                        <div className="col-span-2 max-w-full">
                            <select  className='border-1px rounded-md pl-4 w-full h-8 focus:outline-none dark:bg-slate-500'
                                     value={prodCategory}
                                     onChange={(event) => setProdCategory(event.target.value)}
                            >
                                {
                                    categories.map(cat=>(
                                        <option value={cat} key={cat}>{cat}</option>
                                    ))

                                }
                                <option value="other">other</option>
                            </select>
                            {
                                prodCategory === 'other'&&
                                <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500 mt-2'
                                       value={otherCategory}
                                       onChange={(event) => setOtherCategory(event.target.value)}
                                />
                            }
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                        <div className="col-span-1 font-semibold ">
                            Product brand
                        </div>
                        <div className="col-span-2 max-w-full">
                            <select  className='border-1px rounded-md pl-4 w-full h-8 focus:outline-none dark:bg-slate-500'
                                     value={prodBrand}
                                     onChange={(event) => setProdBrand(event.target.value)}
                            >
                                {
                                    brands.map(brand=>(
                                        <option value={brand} key={brand}>{brand}</option>
                                    ))

                                }
                                <option value="other">other</option>
                            </select>
                            {
                                prodBrand === 'other'&&
                                <input type="text" className='border-1px rounded-md pl-4 w-full h-8 required dark:bg-slate-500 mt-2'
                                       value={otherBrand}
                                       onChange={(event) => setProdBrand(event.target.value)}
                                />
                            }
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                        <div className="col-span-1 font-semibold ">
                            Product price
                        </div>
                        <div className="col-span-2 max-w-full">
                            <NumberInput value={prodPrice} handleChange={setProdPrice} className='border-1px rounded-md pl-4 w-full h-8 dark:bg-slate-500 required'
                                         id='price'
                            />

                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                        <div className="col-span-1 font-semibold ">
                            Product overview
                        </div>
                        <div className="col-span-2 max-w-full">
                            <textarea  className='border-1px rounded-md pl-4 w-full h-18 dark:bg-slate-500'
                                       value={prodOverview}
                                       onChange={(event) => setProdOverview(event.target.value)}
                            />

                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-8">
                        <div className="col-span-1 font-semibold ">
                            Product specification
                        </div>
                        <div className="col-span-2 max-w-full" >
                            <div className='w-full' id='specs-cont'>

                            </div>


                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-8">
                        <div className="col-span-1 font-semibold ">
                            What's in the box
                        </div>
                        <div className="col-span-2 max-w-full" >
                            <div className='w-full' id='box-cont'>

                            </div>


                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 p-4 gap-1 mb-4">
                        <div className="col-span-1 font-semibold ">
                            Product availability
                        </div>
                        <div className="col-span-2 max-w-full">
                                {
                                    prodAvailbility?
                                    <button type='button' className=" w-16 h-8 rounded-pill border-1px border-primary" onClick={()=>{setProdAvailbility(!prodAvailbility)}}>
                                        <span className="block h-5 w-5 bg-primary rounded-full float-right mr-1"></span>
                                    </button>
                                        :
                                        <button type='button' className=" w-16 h-8 rounded-pill border-1px" onClick={()=>{setProdAvailbility(!prodAvailbility)}}>
                                            <span className="block h-5 w-5 bg-gray-300 rounded-full ml-1"></span>
                                        </button>
                                }
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 px-4">
                        <button type='button' className="w-150px h-8 rounded-md flex gap-1 items-center justify-center bg-slate-100  dark:bg-gray-400" onClick={hideEl}>
                            Cancel
                        </button>
                        <button className="w-150px h-8 rounded-md flex gap-1 items-center justify-center bg-primary text-white" >
                            Save
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default AddProduct;
