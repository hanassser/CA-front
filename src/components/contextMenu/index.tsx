import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import "./index.less"

export type CloseType = "all" | "right" | "left" | "current"

interface ContextMenuProps {
  isCurrent: boolean
  visible: boolean
  x: number
  y: number
  setVisible: (v: boolean) => void
  onClose: (t: CloseType) => void
}

const onContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
  e.stopPropagation()
  e.preventDefault()
}


export default function ContextMenu({ isCurrent, visible, x, y, setVisible, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLUListElement>(null)
  const [style, setStyle] = useState({})

  const display = useMemo(() => {
    if (visible) {
      return "block"
    }
    return "none"
  }, [visible])

  const visibility = useMemo(() => {
    if (visible) {
      document.body.style.overflow = "hidden"
      return "visible"
    }
    document.body.style.overflow = "unset"
    return "hidden"
  }, [visible])

  useEffect(() => {
    const wwidth = window.screen.availWidth || document.body.offsetWidth
    const width = ref.current?.offsetWidth || 0
    let left = x, top = y;
    if (x + width > wwidth) {
      left = x - width
    }
    const newStyle = { left, top, visibility }
    setStyle(newStyle)
  }, [x, y, visibility, ref])
  // close menu
  const closeMenu = useCallback(() => {
    if (visibility === "visible") {
      console.log("close the popup");
      setVisible(false)
    }
    return false
  }, [setVisible, visibility])

  // close all
  const closeAll = useCallback((e) => {
    e.stopPropagation()
    console.log("close all");
    onClose("all")
    closeMenu()
  }, [closeMenu, onClose])

  // close right
  const closeRight = useCallback((e) => {
    e.stopPropagation()
    console.log("droite");
    onClose("right")
    closeMenu()
  }, [closeMenu, onClose])

  // 关闭左侧 选项
  const closeLeft = useCallback((e) => {
    e.stopPropagation()
    console.log("gauche");
    onClose("left")
    closeMenu()
  }, [closeMenu, onClose])

  // 关闭当前选项
  const closeCurrent = useCallback((e) => {
    e.stopPropagation()
    console.log("actuel");
    onClose("current")
    closeMenu()
  }, [closeMenu, onClose])

  return <div
    onContextMenu={onContextMenu}
    onMouseUp={closeMenu}
    style={{ display }}
    className="centext-menu"
  >
    <ul style={style} ref={ref}>
      <li onMouseUp={closeAll}>ferme tout</li>
      <li onMouseUp={closeRight}>ferme droite</li>
      <li onMouseUp={closeLeft}>ferme gauche</li>
      {
        isCurrent && <li onMouseUp={closeCurrent}>ferme actuel</li>
      }
    </ul>
  </div>
}
