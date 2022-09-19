import api from '@/api/api';

const interfaceApi = {
  invtCheckList(req) {
    return api.post('/dfw-operation/invtCheck/list',{requestType: 'json', data: req});
  },
  updateTaxRisk(req) {
    return api.post('/dfw-operation/invtCheck/updateTaxRisk',{requestType: 'json', data: req});
  },
  invtCheckExport(req) {
    return api.get('/dfw-operation/invtCheck/export',{requestType: 'json', reponseType: 'blob',  data: req});
  },
  invtCheckDetail(req) {
    return api.get('/dfw-operation/invtCheck/detail',{requestType: 'json', params: req});
  },
  getTaxStatus(req) {
    return api.get('/dfw-operation/param/getTaxStatus',{requestType: 'json', params: req});
  },
  getTaxRisk(req) {
    return api.get('/dfw-operation/param/getTaxRisk',{requestType: 'json', params: req});
  },
};
export default interfaceApi;
