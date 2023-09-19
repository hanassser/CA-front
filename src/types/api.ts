import { UserInfo } from "./user"
import { MenuItem, MenuList } from "./menu"

export type EventList = EventItem[]



type EventItem = {
  add_time: string
  creator: string
  description: string
  m_id: number
  name: string
}

export interface EventAPi extends ResponseData {
  data?: {
    total: number
    mapKey: MapKey
    list: EventList
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
