import {DateSelected} from './dialog/dateAndFrec';

export class SupplierPersonal {
  name: string;
  PhoneNumber: number;
  email: string;
  ContactName: string;
  ContactEmail: string;
  ContactNum: number;
  OrderDays: number;
  type: string;
  frequency = [];
  orderInThisDays = [];
  getInWeekEnd: boolean;
  date = [];
}
