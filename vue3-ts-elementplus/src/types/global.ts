export interface PrimayItem {
  name: string;
  color: string;
}

export interface ServerItem {
  url: string;
  method: string;
  renderData?: (data: any) => any;
}