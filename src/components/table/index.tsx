import { useEffect, useState } from "react";
import {
  Table,
  Row,
  Drawer,
  Radio,
  Tooltip,
  InputNumber,
  Button,
  message,
  notification,
} from "antd";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import MyIcon from "../icon";
import arrayMove from "array-move";
import { getKey, setKey, rmKey } from "@/utils";
import "./index.less";
import { MyTableProps, Columns, renderArugs, Column } from "./types"

const DragHandle = SortableHandle(() => (
  <MyIcon type="icon_mirrorlightctrl" className="drag-sort" />
));
const SortableItem = SortableElement((props: any) => <tr {...props} />);
const SortableBody = SortableContainer((props: any) => <tbody  {...props} />);

const setColTitle: Columns = [
  {
    title: "tri des colonnes",
    dataIndex: "sort",
    className: "drag-visible",
    render: () => <DragHandle />,
  },
  {
    title: "nom de colonne",
    dataIndex: "title",
    className: "drag-visible",
    align: "center",
  },
  {
    title: "largeur",
    dataIndex: "width",
    type: "inputNumber",
  },
  {
    title: "fixé",
    dataIndex: "fixed",
    width: 120,
    type: "switch",
    align: "center",
    range: [
      { v: false, t: "ferme" },
      { v: "left", t: "gauche fixe" },
      { v: "right", t: "droite fixe" },
    ],
  },
  {
    title: "masquer au-delà de la largeur",
    dataIndex: "ellipsis",
    type: "switch",
    align: "center",
    range: [
      { v: false, t: "non" },
      { v: true, t: "oui" },
    ],
  },
  {
    title: "aligner",
    dataIndex: "align",
    type: "switch",
    align: "center",
    range: [
      { v: "left", t: "gauche" },
      { v: "center", t: "au centre" },
      { v: "right", t: "droite" },
    ],
  },
  {
    title: "cacher",
    dataIndex: "hidden",
    type: "switch",
    align: "center",
    range: [
      { v: "hidden", t: "cacher" },
      { v: "auto", t: "montrer" },
    ],
  },
];

const defaultCol: Omit<Column, "dataIndex"> = {
  width: 80,
  fixed: false,
  ellipsis: false,
  align: "left",
  hidden: "auto",
};


function UseTable(columns: Columns, saveKey: MyTableProps["saveKey"]) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [col, setCol] = useState<Columns>([]);
  const [tbTitle, setTitle] = useState<Columns>([]);
  const DraggableContainer = (props: any) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = col.findIndex((x) => x.index === restProps["data-row-key"]);
    return <SortableItem index={index} {...restProps} />;
  };
  useEffect(() => {
    const data: Columns = getKey(true, saveKey || '');
    if (saveKey && data && columns && columns.length === data.length) {
      const columnInfo: any = {},
        dataInfo: any = {};
      columns.forEach((item) => (columnInfo[item.dataIndex] = item));
      data.forEach((item) => (dataInfo[item.dataIndex] = item));
      const isSameKey = Array.isArray(data)
        ? data.every((i) => i.dataIndex === columnInfo[i.dataIndex]?.dataIndex)
        : false;
      if (isSameKey) {
        // If the current table header data is the same as the array length set by the cache, the cached one will be used first
        const merge = data.map((item) => ({
          ...defaultCol,
          ...columnInfo[item.dataIndex],
          ...item,
        }));
        setCol(merge);
      } else {
        initDefaultCol();
      }
    } else if (!data && columns && columns.length !== col.length) {
      initDefaultCol()
    }
    // eslint-disable-next-line
  }, [saveKey, columns]);

  useEffect(() => {
    if (col.length) {
      const newTb = setColTitle.map((c) => {
        if (c.type === "switch") {
          c.render = (...args: renderArugs) => switchRender(c, ...args);
        }
        if (c.type === "inputNumber") {
          c.render = (...args) => inuputRender(c.dataIndex, ...args);
        }
        return c;
      });
      setTitle(newTb);
    }
    // eslint-disable-next-line
  }, [col]);

  function switchRender(column: Column, text: any, current: Column) {
    return (
      <Radio.Group
        buttonStyle="solid"
        value={text}
        onChange={(e) =>
          switchChange(column.dataIndex, e.target.value, current)
        }
      >
        {column.range &&
          column.range.map((r) => (
            <Row className="mt10" key={r.t} justify="center">
              <Tooltip title={r.t} arrowPointAtCenter>
                <Radio value={r.v}>{r.t}</Radio>
              </Tooltip>
            </Row>
          ))}
      </Radio.Group>
    );
  }
  function switchChange(key: string, val: any, current: Column) {
    const dataIndex = current.dataIndex;
    let newCol = col.map((item) => {
      if (item.dataIndex === dataIndex && key) {
        item[key] = val;
      }
      return item;
    });
    setCol(newCol);
  }

  function inuputRender(dataIndex: string, text: number, col: Column) {
    return (
      <Tooltip title="déclencheur de perte de mise au point" arrowPointAtCenter>
        <InputNumber
          min={0}
          max={800}
          onStep={(v) => switchChange(dataIndex, v, col)}
          onBlur={(v) => switchChange(dataIndex, Number(v.target.value), col)}
          value={text}
        />
      </Tooltip>
    );
  }
  function hiddin() {
    setShowDrawer(false);
  }
  function show() {
    setShowDrawer(true);
  }
  function onSortEnd({ oldIndex, newIndex }: {
    oldIndex: number
    newIndex: number
  }) {
    if (oldIndex !== newIndex) {
      const arr: Array<Columns> = []
      const newData = arrayMove(arr.concat(col), oldIndex, newIndex).filter(
        (el) => !!el
      );
      setCol(newData as unknown as Columns);
    }
  }
  function saveTbSet() {
    if (!saveKey) {
      return notification.error({
        type: "error",
        description: "Vous n'avez pas défini l'attribut savaKey de la table, veuillez le définir et l'enregistrer",
        message: "échec de la sauvegarde",
      });
    }
    setKey(true, saveKey, col);
    message.success("Enregistrer les paramètres avec succès");
  }
  // 删除 保存的表格显示
  const delTbSet = () => {
    if (!saveKey) {
      return notification.error({
        type: "error",
        description: "Vous n'avez pas défini l'attribut savaKey de la table, veuillez le définir et cliquer pour supprimer",
        message: "échec de supprimer",
      });
    }
    rmKey(true, saveKey);
    initDefaultCol();
    message.success("supprimé avec succès");
  };
  // Initialize the default format of the table
  function initDefaultCol() {
    const newCol = columns.map((c, index) => ({
      ...defaultCol,
      ...c,
      index,
    }));
    setCol(newCol);
  }
  return {
    col,
    showDrawer,
    show,
    hiddin,
    tbTitle,
    DraggableContainer,
    DraggableBodyRow,
    saveTbSet,
    delTbSet
  };
}

function MyTable({
  columns,
  dataSource,
  className,
  children,
  saveKey,
  ...Props
}: MyTableProps) {
  const {
    showDrawer,
    show,
    hiddin,
    col,
    tbTitle,
    DraggableContainer,
    DraggableBodyRow,
    saveTbSet,
    delTbSet
  } = UseTable(columns, saveKey);

  return (
    <div className="react-ant-table">
      <Row className="set" justify="end">
        <MyIcon type="icon_edit" onClick={show} />
      </Row>
      <Table
        columns={col.filter((i) => i.hidden !== "hidden")}
        dataSource={dataSource}
        className={
          className
            ? `table-show-container ${className}`
            : "table-show-container"
        }
        {...Props}
      >
        {children}
      </Table>
      <Drawer
        className="table-drawer"
        width={1000}
        onClose={hiddin}
        maskClosable={true}
        visible={showDrawer}
        title="Paramètres d'affichage du tableau"
      >
        <Table
          columns={tbTitle}
          dataSource={col}
          rowKey="index"
          components={{
            body: {
              wrapper: DraggableContainer,
              row: DraggableBodyRow,
            },
          }}
          pagination={false}
        />
        <Row justify="center" className="mt20">
          <Button type="primary" onClick={saveTbSet}>
            Enregistrez ce paramètre de formulaire et il sera activé par défaut la prochaine fois que vous l'ouvrirez
          </Button>
          <Button danger type="ghost" className="del" onClick={delTbSet}>
            Supprimer les paramètres enregistrés
          </Button>
        </Row>
      </Drawer>
    </div>
  );
}
export default MyTable;
