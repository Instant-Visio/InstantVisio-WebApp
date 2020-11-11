export const firestoreFirestoreStub = jest.fn(() => ({
    collection: firestoreCollection,
}))

export const firestoreCollection = jest.fn((path) => {
    return {
        where: firestoreWhere,
        limit: firestoreLimit,
        doc: firestoreDoc,
    }
})

export const firestoreDoc = jest.fn((docId) => {
    return {
        get: firestoreGet,
        set: firestoreSet,
        update: firestoreUpdate,
        onSnapshot: firestoreOnSnapshot,
    }
})

export const firestoreWhere: (
    firstTerm: string,
    operator: string,
    secondTerm: string
) => {
    get: () => {}
    set: () => {}
    update: () => {}
    onSnapshot: () => {}
} = jest.fn((firstTerm: string, operator: string, secondTerm: string) => {
    return {
        where: firestoreWhere,
        limit: firestoreLimit,
        get: firestoreGet,
        set: firestoreSet,
        update: firestoreUpdate,
        onSnapshot: firestoreOnSnapshot,
    }
})

export const firestoreLimit = jest.fn((limitCount: number) => {
    return {
        get: firestoreGet,
        set: firestoreSet,
        update: firestoreUpdate,
        onSnapshot: firestoreOnSnapshot,
    }
})

export const firestoreGet = jest.fn((): Promise<any> => Promise.resolve(true))
export const firestoreSet = jest.fn((): Promise<any> => Promise.resolve(true))
export const firestoreUpdate = jest.fn(
    (): Promise<any> => Promise.resolve(true)
)
export const firestoreOnSnapshot = jest.fn(
    (): Promise<any> => Promise.resolve(true)
)

export const firestoreMockClear = () => {
    firestoreFirestoreStub.mockClear()
    firestoreCollection.mockClear()
    firestoreDoc.mockClear()
    firestoreLimit.mockClear()
    firestoreGet.mockClear()
    firestoreSet.mockClear()
    firestoreUpdate.mockClear()
    firestoreOnSnapshot.mockClear()
}
