/* tslint:disable */
/* eslint-disable */
import { StatusDto } from './status-dto';
export interface PetrolStationWithStatusesViewDto {
  city?: null | string;
  id?: null | number;
  name?: null | string;
  number?: null | string;
  postCode?: null | string;
  stationType?: null | string;
  statuses?: null | Array<StatusDto>;
  street?: null | string;
}
