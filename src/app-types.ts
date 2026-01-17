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
  LIBRARY = "LIBRARY", // 新增：文库中心
}

export interface NavItem {
  id: ViewState
  label: string
  icon: string
}
