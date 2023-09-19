import { useCallback, useEffect, useState } from "react";
import { Drawer, Col, Row, message, Button, Radio, notification } from "antd";
import MyIcon from "@/components/icon";
import Color from "@/components/color";
import { getKey, setKey, rmKey } from "@/utils";
import "./index.less";

interface ThemeData {
  label: string
  value: string
  colorList: ThemeJSON
}
interface ThemeJSON {
  [key: string]: string
}
interface GetColor {
  background: string
}
type ThemeList = ThemeData[]
type ColorInfo = {
  pageX: number
  pageY: number
  key: string
  value: string
}

function findInfoColor(list: ThemeJSON[], obj: ThemeJSON) {
  return list.map((item) => {
    let key = item.key;
    let value = obj[key];
    if (value) {
      item.value = value;
    }
    return item;
  });
}

function setObjVal(list: ThemeJSON[], obj: ThemeJSON) {
  list.forEach((i) => {
    if (obj[i.key]) {
      obj[i.key] = i.value;
    }
  });
}

const getColor = (color: string): GetColor => ({
  background: color,
});


const darkTheme: ThemeJSON = process.env.showColorSet ? require("@/assets/theme/dark.json") : {};
const defaultTheme: ThemeJSON = process.env.showColorSet ? require("@/assets/theme/default.json") : {};

const Themes: ThemeList = [
  { label: "default", value: "default", colorList: defaultTheme },
  { label: "dark", value: "dark", colorList: darkTheme },
];


const THEMENAMEKEY = "theme-name";
const THEMDATAKEY = "theme-data";
const THEME_NAME = getKey(true, THEMENAMEKEY);
const THEME: ThemeJSON = getKey(true, THEMDATAKEY);
const initSelectInfo = { key: '', value: '', pageX: 0, pageY: 0 }

export default function SetTheme() {
  const [visible, setVisible] = useState(false);
  const [selectInfo, setInfo] = useState<ColorInfo>(initSelectInfo);
  const [colorShow, setColorShow] = useState(false);
  const [colorList, setColor] = useState(process.env.varColors);
  const [themeStyle, setStyle] = useState(THEME_NAME || Themes[0].value);
  // close color
  const onCloseColor = useCallback(() => {
    setInfo(initSelectInfo);
    setColorShow(false);
  }, []);

  // set theme
  const setTheme = useCallback(
    (obj, list, tip = true) => {
      window.less
        .modifyVars(obj)
        .then(() => {
          tip && message.success("修改主题色成功");
          setColor(list);
          onCloseColor();
        })
        .catch(() => {
          tip && message.error("修改失败");
        });
    },
    [onCloseColor]
  );
  // initialize theme
  useEffect(() => {
    if (THEME && THEME_NAME) {
      let newColorList = [...colorList.map((i) => ({ ...i }))];
      newColorList = findInfoColor(newColorList, THEME);
      let newColorObj = {
        ...Themes.find((i) => i.value === THEME_NAME)?.colorList,
      };
      setTheme(newColorObj, newColorList, false);
      setStyle(THEME_NAME);
    }
    // eslint-disable-next-line
  }, []);

  // close drawer
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  // show drawer
  const showDrawer = useCallback(() => {
    setVisible(true);
  }, []);

  // select personalized color
  const onChangeComplete = useCallback(
    (v, k: string) => {
      let newColorList = [...colorList.map((i) => ({ ...i }))];
      newColorList.forEach((i) => {
        if (i.key === k) {
          i.value = v.hex;
        }
      });
      let colorObj = {
        ...Themes.find((i) => i.value === themeStyle)?.colorList,
      };
      setObjVal(newColorList, colorObj);
      setTheme(colorObj, newColorList);
    },
    [colorList, setTheme, themeStyle]
  );

  // select
  const onSelect = useCallback((e, info) => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    let { clientX: pageX, clientY: pageY } = e;
    if (pageY + 350 > height) {
      pageY -= 320;
    }
    if (pageX + 250 > width) {
      pageX -= 220;
    }
    setInfo({ ...info, pageX, pageY });
    setColorShow(true);
  }, []);

  // save local
  const saveLocalTheme = useCallback(() => {
    let themeObj = { ...Themes.find((i) => i.value === themeStyle)?.colorList };
    themeObj = colorList.reduce((a, c) => {
      a[c.key] = c.value;
      return a;
    }, themeObj);
    setKey(true, THEMENAMEKEY, themeStyle);
    setKey(true, THEMDATAKEY, themeObj);
    message.success("主题成功保存到本地！");
  }, [themeStyle, colorList]);

  // chose theme
  const themeChange = useCallback(
    (e) => {
      const { value } = e.target;
      const colorObj = {
        ...Themes.find((i) => i.value === value)?.colorList,
      };
      setObjVal(colorList, colorObj);
      setTheme(colorObj, colorList);
      setStyle(value);
    },
    [colorList, setTheme]
  );
  // delete local theme
  const delTheme = () => {
    if (!getKey(true, THEMENAMEKEY)) {
      return notification.error({
        type: "error",
        description: "Aucun thème local n'a été trouvé, veuillez l'enregistrer et cliquer sur supprimer !",
        message: "impossible de supprimer",
      });
    }
    let initColorObj = { ...Themes[0].colorList };
    process.env.varColors.forEach((item) => {
      initColorObj[item.key] = item.value;
    });
    window.less
      .modifyVars(initColorObj)
      .then((res) => {
        message.success("Modifier la couleur du thème avec succès");
        rmKey(true, THEMDATAKEY);
        rmKey(true, THEMENAMEKEY);
        setColor(process.env.varColors);
        setStyle(Themes[0].value);
      })
      .catch((err) => {
        message.error("échec de modifier");
      });
  };
  return (
    <div className="set-theme">
      <div className="icon" onClick={showDrawer}>
        <MyIcon type="icon_pen" />
      </div>
      <Drawer
        className="drawer"
        title="Définir la couleur du thème"
        placement="right"
        closable={false}
        onClose={onClose}
        width={400}
        visible={visible}
      >
        <Radio.Group
          options={Themes}
          onChange={themeChange}
          value={themeStyle}
          optionType="button"
          buttonStyle="solid"
        />
        <Row className="color-row primary">Variables personnalisées Less:</Row>
        {colorList.map((i) => (
          <Row className="color-row" justify="space-between" key={i.key}>
            <Col style={{ color: i.value }}>{i.title}:</Col>
            <Col
              className="color-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(e, i);
              }}
              style={getColor(i.value)}
            ></Col>
          </Row>
        ))}

        <Row justify="center">
          <Button type="primary" onClick={saveLocalTheme}>
            enregistrer localement
          </Button>
          <Button type="ghost" className="del" danger onClick={delTheme}>
            Supprimer la configuration du thème de couleur local
          </Button>
        </Row>
        <Color
          pageX={selectInfo.pageX}
          pageY={selectInfo.pageY}
          color={selectInfo.value}
          colorKey={selectInfo.key}
          onSureChange={onChangeComplete}
          onClose={onCloseColor}
          isShow={colorShow}
        />
      </Drawer>
    </div>
  );
}
