import "./index.less";
import React, { useEffect, useState } from 'react';
import {
  getCourseById,
  getEventById,
  getReservationById,
  getSubscriptionById,
  getWorkshopById,
  joinService
} from "@/api/service";
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, message, Typography } from "antd";
import { getStateUser } from "@/store/getters";
import store from "@/store";


export default function ServiceDetailPage({ match: { params: { type, id } } }: RouteComponentProps<{ type: string; id: string }>) {
  console.log(type, "type")
  const [htmlContent, setHtmlContent] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    if (type == 'event') {
      getEventById(id).then((res) => {
        // @ts-ignore
        const { data } = res;
        setTitle(data.event.name);
        setDescription(data.event.description);
        setPrice(data.event.price);
        setHtmlContent(data.event.content);
        console.log(data.event.content, 'res')
      });
    }
    if (type == 'course') {
      getCourseById(id).then((res: any) => {
        const { data } = res;
        setTitle(data.event.name);
        setDescription(data.event.description);
        setPrice(data.event.price);
        setHtmlContent(data.event.content);
        console.log(data.event.content, 'res')
      });
    }
    if (type == 'subscription') {
      getSubscriptionById(id).then((res: any) => {
        const { data } = res;
        setTitle(data.event.name);
        setDescription(data.event.description);
        setPrice(data.event.price);
        console.log(data.event.name, 'name')
        setHtmlContent(data.event.content);
        console.log(data.event.content, 'res')
      });
    }
    if (type == 'workshop') {
      getWorkshopById(id).then((res: any) => {
        const { data } = res;
        setTitle(data.event.name);
        setDescription(data.event.description);
        setPrice(data.event.price);
        console.log(data.event.name, 'name')
        setHtmlContent(data.event.content);
        console.log(data.event.content, 'res')
      });
    }
    if (type == 'reservation') {
      getReservationById(id).then((res: any) => {
        const { data } = res;
        setTitle(data.event.name);
        setDescription(data.event.description);
        setPrice(data.event.price);
        setHtmlContent(data.event.content);
        console.log(data.event.content, 'res')
      });
    }

  }, [type])

  const getData = () => {
    switch (type) {
      case "event":
        getEventById(id).then((res: any) => {
          const { data } = res;
          setHtmlContent(data.event.content);
          console.log(res, 'res')
        });
        break;
      case "subscription":
        getSubscriptionById(id).then((res: any) => {
          const { data } = res;
          setHtmlContent(data.event.content);
          console.log(res, 'res')
        });
        break;
      case "reservation":
        getReservationById(id).then((res: any) => {
          const { data } = res;
          setHtmlContent(data.event.content);
          console.log(res, 'res')
        });
        break;
      case "course":
        getCourseById(id).then((res: any) => {
          const { data } = res;
          setHtmlContent(data.event.content);
          console.log(res, 'res')
        });
        break;
      default:
        return;
    }
    getData();

  }
  const handleJoin = () => {
    // const user = store.getState().user?.user_id;
    joinService({ type, m_id: id }).then((res) => {
      message.success(res.msg)
    });

  }
  return (
    <>
      <div className="container">
        <Typography.Paragraph ellipsis={{ rows: 12 }} >
          <h2> {title}</h2>
          <h4>€: {price}</h4>
          <h5>{description}</h5>

        </Typography.Paragraph>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        <Button type="primary" onClick={handleJoin}>Join</Button>

      </div>

    </>




  );
}
ServiceDetailPage.route = {
  path: '/list/:type/:id'
};
