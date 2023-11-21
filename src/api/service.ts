import ajax from "@/common/ajax";

import {EventAPi, WorkshopAPi, SubscriptionApi, CourseApi, ResponseData, ReservationApi, ServiceApi} from "../types";

const request = ajax;

const addService = (data: any) => request.post("/addService", data) as Promise<ResponseData>;
const getSubscription = (data: any) => request.get("/getSubscription", data) as Promise<SubscriptionApi>;
const getSubscriptionById = (id: any) => request.get(`/getSubscriptionById/${id}`) as Promise<ResponseData>;
const getEvent = (data: any) => request.get("/getEvent", data) as Promise<EventAPi>;
const getEventById = (id: any) => request.get(`/getEventById/${id}`) as Promise<ResponseData>;
const getWorkshop = (data: any) => request.get("/getWorkshop", data) as Promise<WorkshopAPi>;
const getWorkshopById = (id: any) => request.get(`/getWorkshopById/${id}`) as Promise<ResponseData>;
const getCourse = (data: any) => request.get("/getCourse", data) as Promise<CourseApi>;
const getCourseById = (id: any) => request.get(`/getCourseById/${id}`) as Promise<ResponseData>;
const getReservation = (data: any) => request.get("/getReservation", data) as Promise<ReservationApi>;
const getReservationById = (id: any) => request.get(`/getReservationById/${id}`) as Promise<ResponseData>;

const joinService = (data: any) => request.post("/joinService", data) as Promise<ResponseData>;

const getServiceByUserId = () => request.get("/getServiceByUserId") as Promise<ServiceApi>;
const getServiceByIdAndType = (id:any, type: any) => request.get(`/getServiceByIdAndType/${id}/${type}`) as Promise<ServiceApi>;


export {
    addService,
    joinService,
    getEvent,
    getEventById,
    getWorkshop,
    getCourse,
    getReservation,
    getSubscription,
    getSubscriptionById,
    getWorkshopById,
    getCourseById,
    getReservationById,
    getServiceByUserId,
    getServiceByIdAndType,
};
