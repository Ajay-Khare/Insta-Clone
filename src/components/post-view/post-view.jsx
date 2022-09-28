import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Card from "../../card";
import Header from '..//header/header'
import React from "react";
import "./post-view.css"

const PostView = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch("http://localhost:8080/feeds", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                accessToken: sessionStorage.getItem("accessToken")
            }
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.message === "User Is not Loged In") {
                    navigate("/")
                }
                else {
                    if (data.length === undefined) {
                        return navigate("/")
                    }
                    setPosts(data)
                }
            }).catch((err) => {
                if (err) {
                    console.log(err)
                }
            })
    })
    return (
        <>
            <Header className="instaHeader" />
            <div className="post-container">
                {posts.map((post, i) => {
                    return (
                        <Card post={post} key={i} />
                    )
                })}

            </div>
        </>
    )
}
export default PostView