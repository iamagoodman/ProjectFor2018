export interface Attachment {
  id: number;
  size: number | string;
  ossId: string;
  name: string;
  sizeDisplay: string;
  displayStatus: string | number;
}

export interface DataX {
  id: number;
  attachmentDTOList: Attachment[];
  gmtCreateStr: string;
  sendChannelStr: string;
  sendChannel: string;
  title: string;
  sender?: string;
}

export interface DataXFormData {
  startTime?: number;
  endTime?: number;
}
