import { ReactNode, useState } from "react";
import { Card, Tag, Input, Tabs, Row, Col, List, Space, Avatar } from "antd";
import MyIcon from "@/components/icon";
import "./index.less";

const { TabPane } = Tabs;
const { Meta } = Card;

const tagInitVal = [
  { value: "nutrition", color: "magenta" },
  { value: "ddd", color: "volcano" },
  { value: "hygiène", color: "orange" },
  { value: "ss", color: "gold" },
];
function getRandomColor() {
  return "#" + Math.random().toString(16).slice(2, 8);
}

const listData = Array.from({ length: 10 }, (v, k) => ({
  href: "https://ant.design",
  title: `ant design part ${k + 1}`,
  avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText = ({ icon, text }: { icon: ReactNode, text: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const tabpanes = Array.from({ length: 3 }, (v, k) => (
  <TabPane tab={"Tab " + (k + 1)} key={k + 1 + ""}>
    <List
      itemLayout="vertical"
      size="large"
      header={<h2>Tab {k + 1}</h2>}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={<MyIcon type="icon_collection" />}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={<MyIcon type="icon_zan" />}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={<MyIcon type="icon_voice" />}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  </TabPane>
));

export default function Person() {
  const [tags, setTag] = useState(tagInitVal);
  const [isInput, setInput] = useState(false);
  const [value, setVal] = useState("");
  const addTags = () => {
    if (!value) {
      return setInput(false);
    }
    let tempTag = { value: value, color: getRandomColor() };
    setVal("");
    setTag([...tags, tempTag]);
    setInput(false);
  };
  return (
    <div className="person-container">
      <Row>
        <Col span={24}>
          <Card
          >
            <Meta title="" description="" />
            <div className="info">
                <p>
                    <MyIcon type="icon_infopersonal" className="icon" />
                    Admin
                </p>
                <p>
                <MyIcon type="icon_address1" className="icon" />
                Paris 75011
              </p>

            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
Person.route = { [MENU_PATH]: "/my/person" };
