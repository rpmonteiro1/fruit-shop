'use strict'

const expect    = require('expect')
const app       = require('../server')
const UserUtils = require('../utils/user-utils')
const request   = require('supertest').agent(app.listen())

describe('cart endpoint', () => {

  it('should return an error if no user token', (done) => {
    request
      .post('/api/totals')
      .set('Authorization', 'Bearer ' + '')
      .send({})
      .expect(401)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }

        expect(res.error.text).toEqual('Login required')
        done()
      })
  })


  it('should get all the snippets of a user', (done) => {
    const token = UserUtils.createJWT({id: 1})

    request
      .post('/api/totals')
      .set('Authorization', 'Bearer ' + token)
      .send({
        1: 3,
        2: 3,
        3: 3
      })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err)
        }

        expect(res.body.items).toEqual({
          1: {
            total:   0.75,
            savings: 0
          },
          2: {
            total:   0.77,
            savings: 0.13
          },
          3: {
            total:   0.45,
            savings: 0
          }
        })

        expect(res.body.order).toEqual(1.97)
        expect(res.body.savings).toEqual(0.13)
        done()
      })
  })
})
