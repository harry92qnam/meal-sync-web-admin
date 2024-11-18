import CommisionModel from '../models/CommissionModel';
import APICommonResponse from './APICommonResponse';

export interface CommissionGetReponse extends APICommonResponse {
  value: CommisionModel;
}
