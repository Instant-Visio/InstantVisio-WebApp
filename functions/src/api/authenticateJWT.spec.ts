// tslint:disable-next-line:no-implicit-dependencies
import testProto from 'firebase-functions-test'
import admin from 'firebase-admin'
// tslint:disable-next-line:no-implicit-dependencies
import sinon from 'sinon'

// @ts-ignore
const adminInitStub = sinon.stub(admin, 'initializeApp')
const functionTest = testProto()
functionTest.mockConfig({ jwt: { key: '23wr42ewr34' } })
// @ts-ignore
import { authenticateJWT } from './authenticateJWT'

describe('authentificateJWT', () => {
    it('should test that true === true', () => {
        // TODO : finish this later on

        expect(true).toBe(true)
    })
})
