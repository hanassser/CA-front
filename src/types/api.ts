import { UserInfo } from "./user"
import { MenuItem, MenuList } from "./menu"

export type SubscriptionList = SubscriptionItem[]
export type WorkshopList = WorkshopItem[]
export type EventList = EventItem[]
export type CourseList = CourseItem[]
export type ReservationList = ReservationItem[]
export type PostWallList = PostWallItem[]

export interface ResponseData {
  status: number
  msg?: string
}


type EventItem = {
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

type SubscriptionItem = {
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
export interface SubscriptionApi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: SubscriptionList
  }
}

type CourseItem = {
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
    list: CourseList
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
