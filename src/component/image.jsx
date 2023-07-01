import { useEffect, useState } from "react"
import { instance } from "./baseURL/instance";


export const Image = ({fileName}) => {
    const [image, setImage] = useState();

    useEffect(() => {
        if(!fileName || fileName === "")
        return;
        instance({
            url : `https://training.bks.center/api/file/view/${fileName}`,
            method : "GET",
            responseType : "blob"
        })
        .then(res => {
            if(res.data){
                const url = URL.createObjectURL(res.data)
                setImage(url)
            }
        })
        .catch(error => console.error(error))
    },[fileName])
    return(
        <img src={image} style={{width : 50, height : 50}} alt="#" />
    )
}