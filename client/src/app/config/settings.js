const env         = process.env.NODE_ENV
const localServer = 'http://localhost:8080'

const config = {
  env,
  currency:  'CHF',
  jwtKey:    'ricsfsjwt',
  apiServer: env === 'production'
    ? 'https://fruit-shop.herokuapp.com/api'
    : `${localServer}/api`
}

export default config
