// Prevent warning during test because those env vars are undefined
process.env = {
    FIREBASE_CONFIG: '{}',
    GCLOUD_PROJECT: 'someProjectName',
}
