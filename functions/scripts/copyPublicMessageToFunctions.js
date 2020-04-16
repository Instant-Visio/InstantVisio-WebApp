/* eslint-disable */
const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../../public/locales')
const outputFile = path.join(__dirname, '../src/translations.json')

const main = async () => {
    const localDirectories = await listLocalDir()

    console.log(
        `Found ${localDirectories.length} languages: `,
        localDirectories
    )

    const newFileContent = {
        _comment: 'This file is generated and should NOT be updated manually. ',
    }

    for (let i = 0; i < localDirectories.length; i++) {
        const lang = localDirectories[i]
        const items = await readCommonAndGetString(
            `${directoryPath}/${lang}/common.json`
        )
        newFileContent[lang] = items
    }

    console.log(newFileContent)
    await writeTranslationsToFunctionsDir(JSON.stringify(newFileContent))

    console.log('File updated!')
}

const listLocalDir = async () => {
    return new Promise((resolve, reject) =>
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                console.log('Unable to scan directory: ' + err)
                reject('Unable to scan directory: ' + err)
            }
            resolve(files)
        })
    )
}

const readCommonAndGetString = (filePath) => {
    return new Promise((resolve, reject) =>
        fs.readFile(filePath, 'utf8', function (err, contents) {
            if (err) {
                reject('Fail to get content for ' + filePath, err)
                return
            }
            const data = JSON.parse(contents)

            if (!data.message) {
                reject('-- /!\\ Missing message translation for ' + filePath)
            }

            if (!data.message.title) {
                reject(
                    "-- /!\\ Missing 'title' key for translation for " +
                        filePath
                )
            }

            if (!data.message.Message) {
                reject(
                    "-- /!\\ Missing 'Message' key translation for " + filePath
                )
            }
            resolve(data.message)
        })
    )
}

const writeTranslationsToFunctionsDir = (translations) => {
    return new Promise((resolve, reject) =>
        fs.writeFile(outputFile, translations, 'utf8', function (
            err,
            contents
        ) {
            if (err) {
                reject('Fail to write file content ', err)
                return
            }

            resolve()
        })
    )
}

main().catch((error) => {
    console.error(error)
})
