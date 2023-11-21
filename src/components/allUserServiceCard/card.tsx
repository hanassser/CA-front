import {Card, Row, Col, Typography, Button,} from "antd";
import {EventList} from "@/types";
import {Link} from "react-router-dom";
import "./index.less";
import {ClockCircleOutlined} from "@ant-design/icons";
import {delUserService} from "@/api/service";

const { Meta } = Card;

interface CardShowProps {
    data: EventList;
}



export default function AllUserServiceCard({data} :CardShowProps) {

    const cardStyle = {
        width: 340,
    };
    const handleDelete = (id: any) => {
        delUserService(id);
    };
  return (
    <div className="card-container">
      <Row gutter={[16, 16]}>
        {data.map((item:any) => (
          <Col span={8} key={item.name}>

                <Card
                  hoverable
                  style={ cardStyle }
                >
                  <Meta
                    title={item.name}
                    description={
                      <Typography.Paragraph ellipsis={{ rows: 12 }} >
                          <p className="price"> Order ID: {item.order_id}</p>
                          <p > User ID: {item.user_id}</p>
                          <p > Type: {item.type}</p>

                      </Typography.Paragraph>
                    }
                  />
                    <Button type="primary" onClick={handleDelete}>Delete</Button>

                </Card>

          </Col>
        ))}
      </Row>

    </div>
  );
}
AllUserServiceCard.route = { [MENU_PATH]: "/allUserServiceCard" }

// cover={<img alt="example" src="/src/assets/images/plat.png" />}
