'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OngSchema = new _mongoose2.default.Schema({
  nomeFantasia: {
    type: 'String',
    required: true
  },
  razaoSocial: {
    type: 'String',
    required: true
  },
  cnpj: {
    type: 'String',
    required: true
  },
  anoFundacao: {
    type: 'String',
    required: true
  },
  telefone: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true
  },
  urlSite: {
    type: 'String',
    required: true
  },
  slug: {
    type: 'String',
    required: true
  },
  logradouro: {
    type: 'String',
    required: true
  },
  num: {
    type: 'String',
    required: true
  },
  cidade: {
    type: 'String',
    required: true
  },
  estado: {
    type: 'String',
    required: true
  },
  cep: {
    type: 'String',
    required: true
  },
  logo: {
    type: 'String',
    required: true
  },
  backgroundImage: {
    type: 'String',
    required: true
  },
  imagens: [{
    imagem: {
      type: 'String',
      required: true
    }
  }],
  causa: {
    type: 'String',
    required: true
  },
  causaFrontEnd: {
    type: 'String',
    required: true
  },
  localidadesDeAtuacao: [{
    localidade: {
      type: 'String',
      required: true
    }
  }],
  desc: {
    type: 'String',
    required: true
  },
  sobre: {
    type: 'String',
    required: true
  },
  analiseGestao: {
    type: 'String',
    required: true
  },
  analiseTransparencia: {
    type: 'String',
    required: true
  },
  analiseImpacto: {
    type: 'String',
    required: true
  },
  linkPdf: {
    type: 'String',
    required: true
  }
});

exports.default = _mongoose2.default.model('ong', OngSchema);
//# sourceMappingURL=ong.model.js.map
