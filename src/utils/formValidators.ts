export const isNotEmpty = (str: string) => {
    return str.length > 0 ? true : false
}
export const isOnlyLetters = (str: string) => {
    return /^[A-Za-z -áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._]+$/.test(str) ? true : false
}
export const isEmail = (str: string) => {
    return /[^\s@]+@[^\s@]+\.[^\s@]/.test(str)
}
export const isPhone = (str: string) => {
    return /^\d{10}$/.test(str)
}