import './card.css'
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useEffect } from 'react';

const Card = ({ post }) => {

    // const [postData,setPostData]=useState(post)
    const navigator = useNavigate()
    const [liked, setLiked] = useState(false)
    const deleteHandler = (e) => {
        e.preventDefault()
        const id = e.target.id
        let data = { id: id }
        fetch("https://insta-clone-by-ajay.herokuapp.com/remove", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
            .then(res => {
                console.log(res.message)
                if (res.messsage === "success") {
                    navigator("/feeds")
                }
                if (res.message === "invalid user") {
                    alert("You Can't Delete Post of Other User")
                }
            })
    }

    // useEffect({}, [postData])

    const likeHandler = (e) => {
        const like = liked ? -1 : 1

        fetch("https://insta-clone-by-ajay.herokuapp.com/like", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify({ like: like, id: post._id })
        })
            .then(data => data.json())
            .then(res => {
                console.log(res.message)
            })
        setLiked(!liked)
    }



    return (
        <>
            <div className="allPost">
                <div className="card">

                    <form className="cardHeader">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <section className="nameLocation">
                            <div className="name">
                                {post.name}
                            </div>
                            <div className="location">
                                {post.location}
                            </div>
                        </section>
                        <button id={post._id} style={{ cursor: "pointer" }} className="optionButton">
                            <svg onClick={deleteHandler} id={post._id} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="4" y1="7" x2="20" y2="7"></line>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                            </svg>
                        </button>
                    </form>

                    <div className="image">
                        <img src={post.PostImage} alt="img" />
                    </div>

                    <div className="footer">
                        <div className="likeDate">
                            <div className="Icons">
                                <div className='like-share'>
                                    <svg onClick={likeHandler} id={post._id} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="28" height="28" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="red" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                                    </svg>
                                </div>
                                <div><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="28" height="28" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
                                </svg></div>
                            </div>
                            <div className="date">{post.date.split("T")[0]}</div>
                        </div>

                        <div className="likes">
                            {post.likes} likes
                        </div>

                        <div className="description">
                            {post.description}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Card