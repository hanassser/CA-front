import { useEffect, useState } from "react";
import { Row, Button, message, Popconfirm } from "antd";
import { getMenuList as apiGetList, delMenu } from "@/api";
import MenuModal from "@/components/modal/menu";
import MyTable from "@/components/table";
import MyIcon from "@/components/icon";
import { MenuList, MapKey } from "@/types"
import "./index.less";


export type ModalType = "add" | "addChild" | "edit"
export type SelectInfo = {
  key?: string
  isParent?: Boolean
}

function useMenu() {
  const [menus, setMenu] = useState<MenuList>([]);
  const [tabCol, setCol] = useState<MapKey>([]);
  const [selectInfo, setSelectInfo] = useState<SelectInfo>({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('add');


  const menuAction = {
    title: "Opération",
    dataIndex: "action",
    key: "action",
    align: "center",
    render: (text: any, record: any) => {
      return (
        <Row>
          <Button type="link" onClick={() => openModal("edit", record)}>
            modifier
          </Button>
          <Button type="link" onClick={() => openModal("addChild", record)}>
            ajouter un sous-menu
          </Button>
          <Popconfirm
            onConfirm={() => deleteMenu(record)}
            okText="confirmer"
            title="La suppression du menu sélectionné supprimera tous les sous-menus qu'il contient. Confirmer la suppression?"
            cancelText="annuler"
          >
            <Button type="link" danger>
              supprimer
            </Button>
          </Popconfirm>
        </Row>
      );
    },
  };
  const getMenuList = () => {
    apiGetList().then((res) => {
      if (res) {
        res.mapKey.push(menuAction);
        res.mapKey.forEach((item) => {
          if (item.dataIndex === "icon") {
            item.render = (text: string | null) =>
              text ? <MyIcon className="preview" type={text} /> : "Pas encore défini";
          } else if (item.dataIndex === "keepAlive") {
            item.render = (text: string) => (text === "true" ? "Garder" : "fermer détruire");
          }
        });
        setCol(res.mapKey);
        setMenu(res.data);
      }
    });
  };

  useEffect(() => {
    getMenuList();
    // eslint-disable-next-line
  }, []);

  const openModal = (type: ModalType, { key, isParent }: SelectInfo) => {
    setSelectInfo({ key, isParent: !Boolean(isParent) });
    setModalType(type);
    setShowModal(true);
  };

  const deleteMenu = (info: any) => {
    delMenu(info).then((res) => {
      const { msg, status } = res;
      if (status === 0) {
        message.success(msg);
        getMenuList();
      }
    });
  };
  const addMenu = () => {
    openModal("add", {});
  };
  return {
    selectInfo,
    menus,
    showModal,
    modalType,
    tabCol,
    setShowModal,
    getMenuList,
    addMenu,
  };
}

export default function Menu() {
  const {
    selectInfo,
    menus,
    showModal,
    modalType,
    tabCol,
    setShowModal,
    getMenuList,
    addMenu,
  } = useMenu();
  return (
    <div className="powermenu-container">
      <Button type="primary" onClick={addMenu}>
        ajouter menu
      </Button>
      <MyTable dataSource={menus} columns={tabCol} saveKey="MENUTABLE" />
      <MenuModal
        menus={menus}
        isShow={showModal}
        info={selectInfo}
        modalType={modalType}
        setShow={setShowModal}
        updateMenu={getMenuList}
      />
    </div>
  );
}

Menu.route = {
  [MENU_PATH]: "/power/menu"
}
