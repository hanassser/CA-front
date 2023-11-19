import { Card, Row, Col, Typography,  } from "antd";
import {EventList} from "@/types";
import {Link} from "react-router-dom";
import "./index.less";

const { Meta } = Card;

interface CardShowProps {
    data: EventList;
}

export default function PostWall({data} :CardShowProps) {

    const cardStyle = {
        width: 340,
    };
  return (
    <div className="card-container">
      <Row gutter={[16, 16]}>
        {data.map((item:any) => (
          <Col span={8} key={item.name}>
              <Link to={`/list/${item.type}/${item.m_id}`}>
                <Card
                  hoverable
                  style={ cardStyle }
                  cover={<img alt="example" src="/src/assets/images/plat.png" />}
                >
                  <Meta
                    title={item.name}
                    description={
                      <Typography.Paragraph ellipsis={{ rows: 12 }} className="price">
                          €: {item.price}
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
PostWall.route = { [MENU_PATH]: "/post" }
