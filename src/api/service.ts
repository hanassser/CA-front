import ajax from "@/common/ajax";

import {EventAPi, WorkshopAPi, SubscriptionApi, CourseApi, ResponseData, ReservationApi} from "../types";

const request = ajax;


const addService = (data: any) => request.post("/addService", data) as Promise<ResponseData>;
const getSubscription = (data: any) => request.get("/getSubscription", data) as Promise<SubscriptionApi>;
const getEvent = (data: any) => request.get("/getEvent", data) as Promise<EventAPi>;
const getWorkshop = (data: any) => request.get("/getWorkshop", data) as Promise<WorkshopAPi>;
const getCourse = (data: any) => request.get("/getCourse", data) as Promise<CourseApi>;
const getReservation = (data: any) => request.get("/getReservation", data) as Promise<ReservationApi>;




export {
    addService,
    getEvent,
    getWorkshop,
    getCourse,
    getReservation,
    getSubscription,
};
