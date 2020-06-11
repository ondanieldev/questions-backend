module.exports = app => {
    // verify if value is not null
    function existsOrError(value, msg){
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

    // verify if value is null
    function notExistsOrError(value, msg){
        try{
            existsOrError(value, msg)
        }catch(msg){
            return
        }
        throw msg
    }

    // verify if values are the same
    function equalsOrError(valueA, valueB, msg){
        if(valueA !== valueB) throw msg
    }

    // verify if value is in a especified options
    function onEnumOrError(value, options, msg){
        let onEnum = false
        options.forEach(element => {
            if(value === element) onEnum = true
        });
        if(!onEnum) throw msg
    }

    // display functions to acces them by consign
    return { existsOrError, notExistsOrError, equalsOrError, onEnumOrError }
}