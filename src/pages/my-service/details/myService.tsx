import { useState } from "react";
import {
    Form,
    Spin,
} from "antd";
import MyPagination, { PageInfo } from "@/components/pagination";
import "./index.less";
import {SubscriptionList} from "@/types"
import CardShow from "@/components/card/card";
import {getServiceByIdAndType, getServiceByUserId, getSubscription} from "@/api/service";


export default function MyService() {
    const [searchForm] = Form.useForm();
    const [pageData, setPageData] = useState<PageInfo>({ page: 1 });
    const [cardData, setData] = useState<SubscriptionList>([]);
    const [load, setLoad] = useState(true);
    const [total, setTotal] = useState(0);
    const list = [] as any;
    const getDataList = (data: PageInfo) => {
        getServiceByUserId(data).then((res) => {
            const { data, status } = res;

            if (status === 0 && data) {
                // Use map to create an array of promises
                const promises =(data as any).event.map((item: { m_id: any; type: any }) =>
                    getServiceByIdAndType(item.m_id, item.type)
                );

                // Use Promise.all to wait for all promises to resolve
                Promise.all(promises)
                    .then((resultList) => {
                        // Now resultList contains the resolved values of all promises
                        resultList.forEach((result) => {
                            // Do something with each result
                            list.push(result);
                        });

                        let { total } = data;
                        setTotal(total);
                        console.log(list, 'list');
                        let reslist:any  = [];
                        list.forEach((res: { data: { event: any; }; })=>{
                            reslist.push(...res.data.event)
                        })
                        console.log(reslist, 'reslist');

                        setData(reslist);
                        setLoad(false);
                    })
                    .catch((error) => {
                        console.error('Error fetching service data:', error);
                        // Handle errors if necessary
                    });

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
