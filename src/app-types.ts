export enum ViewState {
  NEWS = "NEWS",
  HOTS = "HOTS", // 新增：热点聚合（迁移自 src_back）
  TIMELINE = "TIMELINE",
  RESEARCH = "RESEARCH",
  OUTLINE = "OUTLINE",
  EDITOR = "EDITOR",
  STYLE_DNA = "STYLE_DNA",
  PUBLISH = "PUBLISH",
  DIFF = "DIFF",
  ASSETS = "ASSETS",
}

export interface NavItem {
  id: ViewState
  label: string
  icon: string
}
