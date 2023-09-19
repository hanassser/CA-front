import { useCallback, useState } from "react";
import { Button, Drawer, message, Row, Radio } from "antd";


import "./index.less";




const RadioArray = [
  {
    l: "montrer",
    v: true,
  },
  {
    l: "cacher",
    v: false,
  },
];

function LayoutSet() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const wakeup = useCallback(() => setDrawerVisible(true), []);
  const onClose = useCallback(() => setDrawerVisible(false), []);

  const setLayout = useCallback((mode: LayoutMode) => {
    stateChangeLayout(mode)
    message.success("Mise en page définie avec succès！");
  }, [stateChangeLayout])
  const saveLayout = useCallback(() => {
    setLayoutMode(layoutMode);
    util_setCompVisible(componentsVisible);
    message.success("Mise en page enregistrée localement avec succès！");
  }, [layoutMode, componentsVisible])
  return (
    <div className="layoutset-container">
      <MyIcon type="icon_setting" onClick={wakeup} />
      <Drawer
        className="layoutset-drawer"
        title="définir la mise en page"
        placement="right"
        closable={false}
        onClose={onClose}
        width={300}
        visible={drawerVisible}
      >
        <h2 className="title">sélectionner la mise en page</h2>
        <Row justify="space-around">
          {modes.map((m) => (
            <div
              key={Types.TWO_COLUMN}
              onClick={() => setLayout(Types.TWO_COLUMN)}
              className={Types.TWO_COLUMN === layoutMode ? "col active" : "col"}
            >
            </div>
          ))}
        </Row>
        <h2 className="title">affichage des composants</h2>
        {Object.keys(componentsVisible).map((key) => (
          <Row key={key} className="visible-list">
            {key === "footer" ? "footer：" : "haut basculer la navigation："}
            <Radio.Group
              onChange={(e) => stateSetVisible(key as keyof State["componentsVisible"], e.target.value)}
              value={componentsVisible[key as keyof State["componentsVisible"]]}
            >
              {RadioArray.map((i) => (
                <Radio value={i.v} key={i.l}>
                  {i.l}
                </Radio>
              ))}
            </Radio.Group>
          </Row>
        ))}
        <Row className="save" justify="center">
          <Button type="primary" onClick={saveLayout}>
            enregistrer cette mise en page
          </Button>
        </Row>
      </Drawer>
    </div>
  );
}

export default LayoutSet
