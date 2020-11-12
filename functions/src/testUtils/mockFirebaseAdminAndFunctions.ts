import { firestoreFirestoreStub } from './firestoreStub'
jest.mock('firebase-admin', () => ({
    ...(jest.requireActual('firebase-admin') as {}),
    initializeApp: jest.fn(),
}))

jest.mock('firebase-functions', () => ({
    ...(jest.requireActual('firebase-functions') as {}),
    config: () => ({
        jwt: {
            key: '23wr42ewr34',
        },
    }),
}))

jest.mock('../firebase/firebase.ts', () => ({
    ...(jest.requireActual('../firebase/firebase.ts') as {}),
    db: {
        ...firestoreFirestoreStub(),
    },
}))
