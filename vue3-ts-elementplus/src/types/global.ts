export interface PrimayItem {
  name: string;
  color: string;
}

export interface ServerItem {
  url: string;
  method: string;
  renderData?: (data: any) => any;
}

export interface OptionItem {
  label: string;
  value: string | number | boolean;
}