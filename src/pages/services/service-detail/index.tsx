import "./index.less";
import React, { useState } from 'react';
import {
    getCourseById,
    getEventById,
    getReservationById,
    getSubscriptionById,
    getWorkshopById,
    joinService
} from "@/api/service";
import { RouteComponentProps } from 'react-router-dom';
import {Button, Typography} from "antd";
import {getStateUser} from "@/store/getters";
import store from "@/store";


export default function ServiceDetailPage({match:{params:{type,id}}}: RouteComponentProps<{ type: string; id: string }>) {
    console.log(type,"type")
    const [htmlContent, setHtmlContent] = useState('');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    if(type == 'Event'){
        getEventById(id).then((res)=>{
            const {data} = res;
            setTitle(data.event.name);
            setDescription(data.event.description);
            setPrice(data.event.price);
            setHtmlContent(data.event.content);
            console.log(data.event.content,'res')
        });
    }
    if(type == 'course'){
        getCourseById(id).then((res)=>{
            const {data} = res;
            setTitle(data.event.name);
            setDescription(data.event.description);
            setPrice(data.event.price);
            setHtmlContent(data.event.content);
            console.log(data.event.content,'res')
        });
    }
    if(type == 'subscription'){
        getSubscriptionById(id).then((res)=>{
            const {data} = res;
            setTitle(data.event.name);
            setDescription(data.event.description);
            setPrice(data.event.price);
            console.log(data.event.name,'name')
            setHtmlContent(data.event.content);
            console.log(data.event.content,'res')
        });
    }
    if(type == 'workshop'){
        getWorkshopById(id).then((res)=>{
            const {data} = res;
            setTitle(data.event.name);
            setDescription(data.event.description);
            setPrice(data.event.price);
            console.log(data.event.name,'name')
            setHtmlContent(data.event.content);
            console.log(data.event.content,'res')
        });
    }
    if(type == 'Reservation'){
        getReservationById(id).then((res)=>{
            const {data} = res;
            setTitle(data.event.name);
            setDescription(data.event.description);
            setPrice(data.event.price);
            setHtmlContent(data.event.content);
            console.log(data.event.content,'res')
        });
    }

    const getData = () =>{
     switch (type) {
         case "event" :
             getEventById(id).then((res)=>{
                 const {data} = res;
                 setHtmlContent(data.event.content);
                 console.log(res,'res')
             });
             break;
         case "subscription" :
             getSubscriptionById(id).then((res)=>{
                 const {data} = res;
                 setHtmlContent(data.event.content);
                 console.log(res,'res')
             });
             break;
         case "reservation" :
             getReservationById(id).then((res)=>{
                 const {data} = res;
                 setHtmlContent(data.event.content);
                 console.log(res,'res')
             });
             break;
         case "course" :
             getCourseById(id).then((res)=>{
                 const {data} = res;
                 setHtmlContent(data.event.content);
                 console.log(res,'res')
             });
             break;
         default:
             return;
     }
     getData();

    }
    const handleJoin = () =>{
        const user = store.getState().user?.user_id;
        console.log(user,'user')
        joinService([9,10]).then();

    }
    return (
        <>
            <div className="container">
                <Typography.Paragraph ellipsis={{ rows: 12 }} >
                    <h2> {title}</h2>
                    <h4>€: {price}</h4>
                    <h5>{description}</h5>

                </Typography.Paragraph>
                <div dangerouslySetInnerHTML={{__html: htmlContent}}></div>
                <Button type="primary" onClick={handleJoin}>Join</Button>

            </div>

        </>




    );
}
ServiceDetailPage.route = {
    path: '/list/:type/:id'
};
