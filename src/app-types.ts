
export enum ViewState {
  NEWS = 'NEWS',
  TIMELINE = 'TIMELINE',
  RESEARCH = 'RESEARCH',
  OUTLINE = 'OUTLINE',
  EDITOR = 'EDITOR',
  STYLE_DNA = 'STYLE_DNA',
  PUBLISH = 'PUBLISH',
  DIFF = 'DIFF',
  ASSETS = 'ASSETS'
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: string;
}
