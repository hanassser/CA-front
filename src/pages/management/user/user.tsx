import { useState } from "react";
import {
    Form,
    Spin,
} from "antd";
import MyPagination, { PageInfo } from "@/components/pagination";
import {getAllUserService, getEvent} from "@/api/service";

import "./index.less";
import {EventList} from "@/types"

import UserCard from "@/components/userCard/card";
import {getUserList} from "@/api";


export default function User() {
    const [pageData, setPageData] = useState<PageInfo>({ page: 1 });
    const [cardData, setData] = useState<EventList>([]);
    const [load, setLoad] = useState(true);
    const [total, setTotal] = useState(0);

    const getDataList = (pageData: PageInfo) => {
        getUserList(pageData).then((res:any) => {
            setPageData(pageData);
            const { data, status } = res;
            if (status === 0 && data) {
                let { list, total } = data;
                setTotal(total);
                setData(list);
                setLoad(false);
                return;
            }
        });
    };

    const refresh= ()=>{
        getDataList(pageData)
    }


    const pageChange = (pageData: PageInfo) => {
        getDataList({ ...pageData });
    };


    return (
        <div className="search-container">
            <Spin spinning={load}>
                <UserCard data={cardData} refresh={refresh}/>
                <MyPagination
                    page={pageData.page}
                    immediately={getDataList}
                    change={pageChange}
                    total={total}
                />

            </Spin>
        </div>
    );
}
User.route = {
    [MENU_PATH]: "/manage/user",
};
