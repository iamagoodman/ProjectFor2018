export interface PaymentFormData {
  paymentType?: string;
  appliName?: string;
  businessNo?: string;
  startTime?: string;
  endTime?: string;
  startTimeStr?: string;
  endTimeStr?: string;
}

export interface Payment {
  paymentTheme?: string;
  id?: number;
  paymentType?: string;
  paymentTime?: string;
  aggregateSum?: string;
  businessNo?: string;
  fee?: string;
  chargeTime?: string;
  appliName?: string;
}
