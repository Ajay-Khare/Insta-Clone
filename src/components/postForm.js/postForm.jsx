import { useState } from "react"
import "./postForm.css"
import React from "react";

// import { useNavigate } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

const Form = ({ setShow, show }) => {
    // const navigate = useNavigate()
    const [postData, setPostData] = useState({})

    // console.log(postData)

    const imageHandler = (e) => {
        let file = e.target.files[0]
        // console.log(file)
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPostData({ ...postData, PostImage: reader.result })
            }
        }
    }

    const postHandler = (e) => {
        e.preventDefault()
        fetch("https://insta-clone-by-ajay.herokuapp.com/post", {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken")
            }
        })
            .then((data) => data.json())
            .then(res => {
                if (res.message === "success") {
                    alert("posted successfully")
                    // toast.success("Image Posted Sucessfully In Feeds", { position: toast.POSITION.BOTTOM_CENTER })
                    setShow(!show)
                }
            })
    }
    return (

        <>
            <div className="Container">
                <form className="postForm" onSubmit={(e) => postHandler(e)}>
                    
                    <p className="FormHeading">Create Post</p>
                    <hr className="top" />


                    <label htmlFor="location">Location</label>
                    <input className="postInp" type="text" name="location" required
                        onChange={(e) => {
                            setPostData({ ...postData, location: e.target.value })
                        }}
                    />

                    <label htmlFor="image">Upload Image</label>
                    <input className="postInp chooseFile" type="file"
                        onChange={imageHandler}
                        accept="image/png, image/jpeg"
                        required
                    />
                    <label htmlFor="description">Description</label>
                    <input className="lastPostInp lastInp" type="text" name="description" required
                        onChange={(e) => {
                            setPostData({ ...postData, description: e.target.value })
                        }}
                    />
                    <hr className="bottom" />
                    <button className="submit" type="submit" >Post</button>
                    <button onClick={() => setShow(!show)} className="submit">Cancle</button>
                </form>
                {/* <span className="submit" onClick={()=>setShow(!show)}>Cancle</span> */}
            </div>
            {/* <ToastContainer/> */}
        </>
    )
}

export default Form