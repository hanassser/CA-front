import { useState } from "react";
import {
    Form,
    Spin,
} from "antd";
import MyPagination, { PageInfo } from "@/components/pagination";
import {getAllUserService, getEvent} from "@/api/service";

import "./index.less";
import {EventList} from "@/types"

import AllUserServiceCard from "@/components/allUserServiceCard/card";


export default function AllUserService() {
    const [pageData, setPageData] = useState<PageInfo>({ page: 1 });
    const [cardData, setData] = useState<EventList>([]);
    const [load, setLoad] = useState(true);
    const [total, setTotal] = useState(0);

    const getDataList = (pageData: PageInfo) => {
        getAllUserService(pageData).then((res:any) => {
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
                <AllUserServiceCard data={cardData} refresh={refresh}/>
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
AllUserService.route = {
    [MENU_PATH]: "/manage/all",
};
