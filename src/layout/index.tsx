import { Full, SingleColumn, TowColumn, TwoFlanks } from "./mode";
import * as ActionTypes from "../store/layout/actionTypes";
import "./index.less";
import { useStateLayout, useStateVisible } from "@/store/hooks";

export default function LayoutContainer() {
  const LayoutMode = useStateLayout()
  const visible = useStateVisible()
  switch (LayoutMode) {
    case ActionTypes.SINGLE_COLUMN:
      return <SingleColumn visible={visible} />;
    case ActionTypes.TWO_COLUMN:
      return <TowColumn visible={visible} />;
    case ActionTypes.TWO_FLANKS:
      return <TwoFlanks visible={visible} />;
    case ActionTypes.FULL:
      return <Full />
    default:
      return null;
  }
}