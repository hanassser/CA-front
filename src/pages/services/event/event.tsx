import { useState } from "react";
import {
  Form,
  Input,
  Modal,
  Button,
  Row,
  Col,
  Spin,
  message, Popconfirm,
} from "antd";
import MyPagination, { PageInfo } from "@/components/pagination";
import {getEvent, addEvent} from "@/api";
import MyTable from "@/components/table";
import "./index.less";
import {MessageList, MapKey, ResponseUserInfo, ResponseStockInfo} from "@/types"
import {ModalType, SelectInfo} from "@pages/power/menu";
import StockModal, {StockID} from "@/components/modal/stock";

export default function SearchPage() {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [pageData, setPageData] = useState<PageInfo>({ page: 1 });
  const [tableData, setData] = useState<MessageList>([]);
  const [tableCol, setCol] = useState<MapKey>([]);
  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);
  const [showModal2, setShow2] = useState(false);


  const [chooseId, setId] = useState<StockID>(null);


  const [selectInfo, setSelectInfo] = useState<SelectInfo>({});
  const [modalType, setModalType] = useState<ModalType>('add');

  const activeCol = {
    dataIndex: "active",
    key: "active",
    title: "Opération",
    align: "center",
    render: (text: string, record: ResponseStockInfo) => (
        <Button type="link"  onClick={() => showInfoModal(record.m_id, true)}>
          modifier
        </Button>
    ),
  }
  const showInfoModal = (id: StockID, type: boolean) => {
    console.log(id,'id')
    if (id) {
      setId(id);
    } else {
      setId(null);
    }
    setShow2(type);
  }
  const getDataList = (data: PageInfo) => {
    getMsg(data).then((res) => {
      const { data, status } = res;
      if (status === 0 && data) {
        let { list, total, mapKey } = data;
        mapKey = mapKey.map((i) => {
          if (i.key === "description") {
            i.width = 500;
          }
          return i;
        });
        mapKey.push(activeCol);
        setCol(mapKey);
        setTotal(total);
        setData(list.map((i) => ({ ...i, key: i.m_id })));
        setLoad(false);
        return;
      }
    });
  };
  const updateUserData = () => {
    getDataList(pageData);
  }

  const addList = () => {
    form.validateFields().then((values) => {
      addMsg(values).then((res) => {
        if (res.status === 0) {
          form.resetFields();
          message.success(res.msg);
          setShow(false);
          search();
        }
      });
    });
  };


  const search = () => {
    let data = searchForm.getFieldsValue();
    setPageData({ page: 1 })
    getDataList(data);
  };


  const pageChange = (pageData: PageInfo) => {
    let data = searchForm.getFieldsValue();
    getDataList({ ...pageData, ...data });
    setPageData(pageData);
  };

  const tableTop = (
    <Row justify="space-between" gutter={80}>
      <Col style={{ lineHeight: "32px" }}></Col>
      <Col>
        <Button type="primary" onClick={() => setShow(true)}>
          ajouter un article
        </Button>
      </Col>
    </Row>
  );
  return (
    <div className="search-container">
      <Spin spinning={load}>
        <div className="top-form">
          <Form layout="inline" form={searchForm}>
            <Form.Item name="name">
              <Input placeholder="le nom de l'article" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="la description" />
            </Form.Item>
            <Button onClick={search} type="primary" className="submit-btn">
              recherche
            </Button>
            <Button
              onClick={() => {
                searchForm.resetFields();
                search();
              }}
            >
              vide
            </Button>
          </Form>
        </div>
        <MyTable
          title={() => tableTop}
          dataSource={tableData}
          columns={tableCol}
          pagination={false}
          saveKey="MyListSearch1"
        />
        <MyPagination
          page={pageData.page}
          immediately={getDataList}
          change={pageChange}
          total={total}
        />
        <StockModal
            isShow={showModal2}
            m_id={chooseId}
            onCancel={showInfoModal}
            onOk={updateUserData}
        />
      </Spin>
      <Modal
        title="ajouter un article"
        visible={showModal}
        cancelText="annuler"
        okText="ajouter"
        onOk={() => addList()}
        onCancel={() => setShow(false)}
      >
        <Form form={form}>
          <Form.Item
            label="le nom de l'article"
            name="name"
            rules={[
              {
                required: true,
                message: "Veuillez entrer le nom",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="le poids de l'article"
              name="weight"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le poids",
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="la description"
            name="description"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre description",
              },
              {
                min: 3,
                message: "La description doit faire plus de 3 mots",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="le fournisseur"
              name="provider"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le fournisseur",
                },
                {
                  min: 3,
                  message: "La description doit faire plus de 3 mots",
                },
              ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
SearchPage.route = {
  [MENU_PATH]: "/list/event",
};
