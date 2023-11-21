import {Card, Row, Col, Typography, Button, message,} from "antd";
import {EventList} from "@/types";
import {Link} from "react-router-dom";
import "./index.less";
import {ClockCircleOutlined} from "@ant-design/icons";
import {addService, delUser, delUserService} from "@/api/service";

const { Meta } = Card;

interface CardShowProps {
    data: EventList;
    refresh?:()=>void
}



export default function UserCard({data,refresh} :CardShowProps) {

    const cardStyle = {
        width: 340,
    };
    const handleDelete = (id: any) => {
        delUser(id).then((res) => {
            if (res.status === 0) {
                message.success(res.msg);
                refresh && refresh()
            }
        });


    };
    return (
        <div className="card-container">
            <Row gutter={[16, 16]}>
                {data.map((item:any) => (
                    <Col span={8} key={item.order_id}>

                        <Card
                            hoverable
                            style={ cardStyle }
                        >
                            <Meta
                                title={item.name}
                                description={
                                    <Typography.Paragraph ellipsis={{ rows: 12 }} >
                                        <p className="price"> Username: {item.username}</p>
                                        <p > User ID: {item.user_id}</p>
                                    </Typography.Paragraph>
                                }
                            />
                            <Button type="primary" onClick={()=>handleDelete(item.user_id)}>Delete</Button>

                        </Card>

                    </Col>
                ))}
            </Row>

        </div>
    );
}
UserCard.route = { [MENU_PATH]: "/userCard" }

// cover={<img alt="example" src="/src/assets/images/plat.png" />}
