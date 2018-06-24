const generate = (c) =>
    exports[c] = c

const generatePromise = (c) => {
    generate(`${c}_PENDING`)
    generate(`${c}_FULFILLED`)
    generate(`${c}_REJECTED`)
    generate(c)
}

const generateModel = (c) => {
    generatePromise(`LOAD_${c}`)
    generatePromise(`SAVE_${c}`)
    generatePromise(`REMOVE_${c}`)
}

generate('SET_AUTH_TOKEN')
generate('UNSET_AUTH_TOKEN')
generateModel('REALTY')
generatePromise('LOAD_REALTY_ITEM')
generatePromise('LOAD_OWN_REALTY')
generatePromise('LOAD_BOOKED_REALTY')
generatePromise('BOOK_REALTY')
generateModel('USERS')
generatePromise('LOAD_CURRENT')
generatePromise('LOAD_REVIEWS_ABOUT')
