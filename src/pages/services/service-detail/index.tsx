import "./index.less";
import React, { useState } from 'react';
import {Button} from "antd";
import {getCourseById, getEventById, getReservationById, getSubscriptionById} from "@/api/service";
import { RouteComponentProps } from 'react-router-dom';



// export default function ServiceDetailPage({match:{params:{type,id}}}: RouteComponentProps<{ type: string; id: string }>) {
//     const [htmlContent, setHtmlContent] = useState('');
//     if(type == 'Event'){
//         getEventById(id).then((res)=>{
//             const {data} = res;
//             setHtmlContent(data.event.content);
//             console.log(data.event.content,'res')
//         });
//     }
//     if(type == 'Subscription'){
//         getSubscriptionById(id).then((res)=>{
//             const {data} = res;
//             setHtmlContent(data.event.content);
//             console.log(data.event.content,'res')
//         });
//     }
//     if(type == 'Reservation'){
//         getReservationById(id).then((res)=>{
//             const {data} = res;
//             setHtmlContent(data.event.content);
//             console.log(data.event.content,'res')
//         });
//     }
//
//     const getData = () =>{
//      switch (type) {
//          case "Event" :
//              getEventById(id).then((res)=>{
//                  const {data} = res;
//                  setHtmlContent(data.event.content);
//                  console.log(res,'res')
//              });
//              break;
//          case "subscription" :
//              getSubscriptionById(id).then((res)=>{
//                  const {data} = res;
//                  setHtmlContent(data.event.content);
//                  console.log(res,'res')
//              });
//              break;
//          case "Reservation" :
//              getReservationById(id).then((res)=>{
//                  const {data} = res;
//                  setHtmlContent(data.event.content);
//                  console.log(res,'res')
//              });
//              break;
//          case "Course" :
//              getCourseById(id).then((res)=>{
//                  const {data} = res;
//                  setHtmlContent(data.event.content);
//                  console.log(res,'res')
//              });
//              break;
//          default:
//              return;
//      }
//      getData();
//
//     }
//     return (
//         <div className="container">
//             <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
//
//
//
//         </div>
//     );
// }
// ServiceDetailPage.route = {
//     path: '/list/:type/:id'
// };
