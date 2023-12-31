import { ReactNode, useEffect, useState } from "react";
import MyIcon from "@/components/icon";
import MyForm, { FormItemData } from "@/components/form";
import { Modal, Select, message, FormInstance } from "antd";
import { addMenu, getMenuInfo, editMenu } from "@/api";
import { MenuList, MenuItem } from "@/types"
import { ModalType, SelectInfo } from "@/pages/others/power/menu"
import "./index.less";
interface IconItem {
  icon_id: string,
  name: string,
  font_class: string,
  unicode: string,
  unicode_decimal: number
}

interface MenuModalProps {
  info: SelectInfo
  modalType: ModalType
  isShow: boolean
  setShow: (s: boolean) => void
  updateMenu: () => void
  menus: MenuList
}

interface ActiveFn {
  add: (data: MenuItem) => void;
  edit: (data: MenuItem) => void;
  addChild: (data: MenuItem) => void;
}
const ICON_JSON = require("@/assets/json/iconfont.json");
const ICON_PREFIX: string = ICON_JSON.css_prefix_text;
const ICON_DATA: IconItem[] = ICON_JSON.glyphs;
const { Option } = Select;
const titleType: {
  add: string;
  addChild: string;
  edit: string;
} = {
  add: "Ajouter un menu",
  addChild: "Ajouter un sous-menu",
  edit: "Modifier les informations du menu",
};

const initFormItems: FormItemData[] = [
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "Veuillez remplir le titre du menu" }],
      label: "le titre du menu",
      name: "title",
    },
    childProps: {
      placeholder: "titre du menu",
    },
  },
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "Veuillez remplir le chemin du menu" }],
      label: "chemin du menu",
      name: "path",
    },
    childProps: {
      placeholder: "chemin du menu",
    },
  },
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "Veuillez renseigner la valeur de key de menu" }],
      label: "menu key",
      name: "key",
    },
    childProps: {
      placeholder: "La valeur de key de menu doit être unique, sinon la création échouera",
    },
  },
  {
    itemType: "select",
    itemProps: {
      label: "menu parent",
      name: "parentKey",
    },
    childProps: {
      placeholder: "menu parent",
    },
  },
  {
    itemType: "select",
    itemProps: {
      label: "icon",
      name: "icon",
    },
    childProps: {
      placeholder: "icon",
      allowClear: true,
      showSearch: true,
      getPopupContainer: (v: ReactNode) => v,
      children: ICON_DATA.map((icon) => (
        <Option value={ICON_PREFIX + icon.font_class} key={icon.icon_id}>
          <div className="icons">
            <MyIcon type={ICON_PREFIX + icon.font_class} />
            <span className="title"> {icon.font_class}</span>
          </div>
        </Option>
      )),
    },
  },
  {
    itemType: "radio",
    itemProps: {
      rules: [{ required: true, message: "Veuillez sélectionner le mode de mise en cache du menu" }],
      name: "keepAlive",
      label: "Si la page est mise en cache",
    },
    childProps: {
      options: [
        { label: "oui", value: "true" },
        { label: "non", value: "false" },
      ],
    },
  },
  {
    itemType: "inputNumber",
    itemProps: {
      className: "ipt-number",
      rules: [
        {
          type: "number",
          min: 0,
          max: 10000,
          message: "Veuillez remplir correctement la taille de tri du menu",
        },
        { required: true, message: "Veuillez remplir la taille de tri du menu" },
      ],
      name: "order",
      label: "tri de menu",
    },
    childProps: {
      placeholder: "Plus la valeur est petite, plus le front est élevé",
    },
  },
];
export default function MenuModal({
  info,
  modalType = "add",
  isShow,
  setShow,
  updateMenu,
  menus = [],
}: MenuModalProps) {
  const [form, setForm] = useState<FormInstance | null>(null);
  const [activeFn] = useState<ActiveFn>({ add, edit, addChild: add });
  const [formItems, setItems] = useState<FormItemData[]>([]);
  // create item
  useEffect(() => {
    if (modalType !== "add" && menus && info) {
      let items = [...initFormItems.map((i) => ({ ...i }))];
      items.forEach((i) => {
        if (i.itemProps.name === "parentKey") {
          i.childProps = { ...i.childProps }
          i.childProps.disabled =
            modalType === "addChild" || (modalType === "edit" && info.isParent);
          i.childProps.children = menus.map((menu) => (
            <Option value={menu.key} key={menu.key}>
              <div className="icons">
                <MyIcon type={menu.icon} />
                <span className="title"> {menu.title}</span>
              </div>
            </Option>
          ));
        }
      });
      setItems(items);
    } else if (info && modalType === "add" && menus) {
      let items = [...initFormItems.map((i) => ({ ...i }))];
      items = items.filter((i) => i.itemProps.name !== "parentKey");
      setItems(items);
    }
  }, [modalType, info, menus]);

  useEffect(() => {
    if (modalType === "edit" && isShow && form) {
      getMenuInfo({ key: info && info.key }).then((res) => {
        if (res.status === 0 && res.data) {
          form.setFieldsValue(res.data);
        }
      });
    } else if (modalType === "addChild" && isShow && form) {
      form.setFieldsValue({
        parentKey: info && info.key,
      });
    }
  }, [modalType, isShow, info, form]);
  // submit create
  const submit = () => {
    form && form.validateFields().then((values) => {
      let fn = activeFn[modalType];
      fn(values);
    });
  };

  const onCancel = () => {
    form && form.resetFields();
    setShow(false);
  };
  function edit(data: MenuItem) {
    editMenu(data).then((res) => {
      const { status, msg } = res;
      if (status === 0) {
        message.success(msg);
        onCancel();
        updateMenu();
      }
    });
  }
  function add(data: MenuItem) {
    addMenu(data).then((res) => {
      const { status, msg } = res;
      if (status === 0) {
        message.success(msg);
        onCancel();
        updateMenu();
      }
    });
  }
  return (
    <Modal
      maskClosable={false}
      title={titleType[modalType]}
      visible={isShow}
      okText="confirmer"
      cancelText="annuler"
      onCancel={onCancel}
      onOk={submit}
    >
      <MyForm handleInstance={setForm} items={formItems} />
    </Modal>
  );
}
