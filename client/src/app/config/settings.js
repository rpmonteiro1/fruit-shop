const env         = process.env.NODE_ENV
const localServer = 'http://localhost:9010'

const config = {
  env,
  currency:  'CHF',
  jwtKey:    'ricsfsjwt',
  apiServer: env === 'production' ? 'https://amz-fba-sv.herokuapp.com/api' : `${localServer}/api`
}

export default config
