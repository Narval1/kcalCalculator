import apiController from './controller'

export const BASE_ROUTE = '/calculadora'

export const initialize = (server) => {
  server.post(`${BASE_ROUTE}`, apiController.energeticTotal)
}

export default {
  initialize,
  BASE_ROUTE
}
