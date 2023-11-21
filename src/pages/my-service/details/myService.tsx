import { useState } from "react";
import {
    Form,
    Spin,
} from "antd";
import MyPagination, { PageInfo } from "@/components/pagination";
import "./index.less";
import {SubscriptionList} from "@/types"
import CardShow from "@/components/card/card";
import {getServiceByUserId, getSubscription} from "@/api/service";


export default function MyService() {
    const [searchForm] = Form.useForm();
    const [pageData, setPageData] = useState<PageInfo>({ page: 1 });
    const [cardData, setData] = useState<SubscriptionList>([]);
    const [load, setLoad] = useState(true);
    const [total, setTotal] = useState(0);

    const getDataList = (data: PageInfo) => {
        getServiceByUserId(data).then((res) => {
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



    const pageChange = (pageData: PageInfo) => {
        let data = searchForm.getFieldsValue();
        getDataList({ ...pageData, ...data });
        setPageData(pageData);
    };


    return (
        <div className="container">
            <Spin spinning={load}>
                <CardShow data={cardData}/>
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
MyService.route = {
    [MENU_PATH]: "/manage/my-service",
};
