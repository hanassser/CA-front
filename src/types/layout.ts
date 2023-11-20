
export type LayoutMode = "TWO_COLUMN" | "SINGLECOLUMN" | "TWO_FLANKS" | "FULL"

export interface LayoutAction {
  type: LayoutMode,
  mode: LayoutMode
}

export type LayoutModes = {
  img: string
  mode: LayoutMode
  alt: string
}[]
