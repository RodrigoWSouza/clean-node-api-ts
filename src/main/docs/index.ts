import components from './components'
import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: '4Dev - Enquetes para Programadores',
    description: 'Essa é a documentação da API feita em treinamento de NodeJs usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns.',
    version: '1.0.0',
    contact: {
      name: 'Rodrigo Souza',
      email: 'rodrigo-w-s@hotmail.com',
      url: 'https://www.linkedin.com/in/rodrigo-souza-9b125bb8/'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Auth',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Enquete',
    description: 'APIs relacionadas a Enquete'
  }],
  paths,
  schemas,
  components
}
