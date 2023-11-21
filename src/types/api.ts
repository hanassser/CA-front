import { UserInfo } from "./user"
import { MenuItem, MenuList } from "./menu"

export type EventList = EventItem[]
export type WorkshopList = WorkshopItem[]
export type PostWallList = PostWallItem[]
export type CourseList = CourseItem[]
export type ReservationList = ReservationItem[]
export type  SubscriptionList = SubscriptionItem[]
export type  ServiceList = ServiceItem[]


type ServiceItem = {
  m_id: number
  user_id: number
}
export interface ServiceApi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: ServiceList
  }
}



type EventItem = {
  m_id: number
  name: string
  price: string
  type: string
  totalPlace: number
  bookedPlace: number
  time: string
  date: string
  description: string
  content: string
  creator: string
  add_time: string
}
export interface ResponseData {
  status: number
  msg?: string
}
export interface EventAPi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: EventList
  }
}

type WorkshopItem = {
  m_id: number
  name: string
  price: string
  type: string
  totalPlace: number
  bookedPlace: number
  time: string
  date: string
  description: string
  content: string
  creator: string
  add_time: string
}
export interface WorkshopAPi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: WorkshopList
  }
}

type CourseItem = {
  m_id: number
  name: string
  price: string
  type: string
  totalPlace: number
  bookedPlace: number
  time: string
  date: string
  description: string
  content: string
  creator: string
  add_time: string
}
export interface CourseApi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: CourseList
  }
}

type ReservationItem = {
  m_id: number
  name: string
  price: string
  type: string
  totalPlace: number
  bookedPlace: number
  time: string
  date: string
  description: string
  content: string
  creator: string
  add_time: string
}
export interface ReservationApi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: ReservationList
  }
}

type PostWallItem = {
  m_id: number
  name: string
  price: string
  type: string
  date: string
  description: string
  content: string
  creator: string
  add_time: string
}
export interface PostWallApi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: PostWallList
  }
}


type SubscriptionItem = {
  m_id: number
  name: string
  price: string
  type: string
  totalPlace: number
  bookedPlace: number
  time: string
  date: string
  description: string
  content: string
  creator: string
  add_time: string
}
export interface SubscriptionApi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: SubscriptionList
  }
}

export type MapKey = {
  dataIndex: string
  key: string
  title: string
  width?: number
  [keyname: string]: any
}[]
export interface ResponseData {
  status: number
  msg?: string
}

export interface LoginApi extends ResponseData {
  data: UserInfo
  token: string
}
export type PowerList = {
  type_id: number
  name: string
  menu_id: string
}[]

export interface PowerApi extends ResponseData {
  data: PowerList
  mapKey: MapKey
  menu: MenuList
}

export interface MenuInfoApi extends ResponseData {
  data: MenuItem | null
}

export type ResponseUserInfo = {
  account: string
  pswd: string
  type: string
  user_id: number
  username: string
}


export interface UserListApi extends ResponseData {
  data: {
    list: ResponseUserInfo[]
    mapKey: MapKey
  }
  total: number
}







