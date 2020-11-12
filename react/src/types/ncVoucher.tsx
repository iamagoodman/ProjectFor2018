export interface NCVoucherFormData {
  voucherType?: string;
  prepared?: string;
}

export interface NCVoucherUploadData {
  preparedDate: number;
}

export interface NCVoucherItem {
  voucherType: string;
  prepared: string;
  preparedDate: string;
  uploadStatus: string;
}
