import { useEffect, useState } from "react";
import { Modal,  Select, message, FormInstance } from "antd";
import MyForm, { FormItemData } from "@/components/form";
import { getPower, addUser, getUser, editUser } from "@/api";

export type UserID = null | number
interface UserProps {
  user_id: UserID
  isShow: boolean
  onCancel: (id: UserID, s: boolean) => void
  onOk: () => void
}
const { Option } = Select;

const paswdRule = [{ required: true, message: "Veuillez renseigner le mot de passe de connexion" }];
const initFormItems: FormItemData[] = [
  {
    itemType: "input",
    itemProps: {
      name: "username",
      rules: [{ required: true, message: "s'il vous plaît entrez le nom d'utilisateur" }],
      label: "nom d'utilisateur",
    },
    childProps: {
      placeholder: "nom d'utilisateur",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "account",
      rules: [{ required: true, message: "Veuillez renseigner le compte de connexion" }],
      label: "le compte de connexion",
    },
    childProps: {
      placeholder: "le compte de connexion",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "pswd",
      label: "mot de passe",
    },
    childProps: {
      placeholder: "Mot de passe de connexion, s'il est rempli, cela signifie une modification",
      type: "password",
    },
  },
  {
    itemType: "select",
    itemProps: {
      rules: [{ required: true, message: "Veuillez sélectionner les autorisations de menu" }],
      name: "type_id",
      label: "les autorisations de menu",
    },
    childProps: {
      placeholder: "les autorisations de menu",
    },
  },
];

export default function UserModal({ user_id, isShow, onCancel, onOk }: UserProps) {
  const [form, setForm] = useState<FormInstance | null>(null);
  const [formItems, setItems] = useState<FormItemData[]>([]);
  useEffect(() => {
    if (isShow) {
      getPower().then((res) => {
        const { data, status } = res;
        if (status === 0) {
          let items = initFormItems.map((i) => ({ ...i }));
          items.forEach((i) => {
            if (i.itemProps.name === "type_id") {
              i.childProps = { ...i.childProps }
              i.childProps.children = data.map((power) => (
                <Option value={power.type_id} key={power.type_id}>
                  {power.name}
                </Option>
              ));
            }
          });
          setItems(items);
        }
      });
    }
  }, [isShow]);


  useEffect(() => {
    if (user_id && form) {
      getUser({ user_id }).then((res) => {
        if (res.data) {
          form.setFieldsValue(res.data);
        }
      });
      let items = initFormItems.map((i) => ({ ...i }));
      items.forEach((i) => {
        if (i.itemProps.name === "pswd") {
          i.itemProps.rules = undefined;
        }
      });
      setItems(items);
    } else if (!user_id) {
      // set formItem
      let items = initFormItems.map((i) => ({ ...i }));
      items.forEach((i) => {
        if (i.itemProps.name === "pswd") {
          i.itemProps.rules = paswdRule;
        }
      });
      setItems(items);
    }
  }, [user_id, form]);

  const submit = () => {
    form && form.validateFields().then((values) => {
      let modify = Boolean(user_id);
      let fn = modify ? editUser : addUser;
      if (modify) {
        values.user_id = user_id;
      }
      fn(values).then((res) => {
        if (res.status === 0) {
          message.success(res.msg);
          close();
          onOk();
        }
      });
    });
  };
  const close = () => {
    form && form.resetFields();
    onCancel(null, false);
  };
  return (
    <Modal
      maskClosable={false}
      title={user_id ? "Modifier les informations" : "Ajouter un compte"}
      visible={isShow}
      okText="confirmer"
      cancelText="annuler"
      onCancel={close}
      onOk={submit}
    >
      <MyForm handleInstance={setForm} items={formItems} />
    </Modal>
  );
}
