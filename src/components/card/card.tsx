import { Card, Avatar, Row, Col, Typography,  } from "antd";
import {EventList} from "@/types";
import {Link} from "react-router-dom";


const { Meta } = Card;

interface CardShowProps {
    data: EventList;
}

export default function CardShow({data} :CardShowProps) {
    const cardStyle = {
        width: 340,
    };
    return (
        <div className="card-container">
            <Row gutter={[16, 16]}>
                {data.map((item:any) => (
                    <Col span={8} key={item.name}>
                        <Link to={`/list/card/${item.m_id}`}>
                            <Card
                                hoverable
                                style={ cardStyle }
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            >
                                <Meta
                                    title={item.name}
                                    description={
                                        <Typography.Paragraph ellipsis={{ rows: 12, suffix: "..." }}>
                                            {item.price}
                                        </Typography.Paragraph>
                                    }
                                />
                                <p>{item.description}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

        </div>
    );
}
CardShow.route = { [MENU_PATH]: "/list/card" }
