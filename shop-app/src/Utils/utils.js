export const checkItemById = (arr, itemId) => {
    return(
        arr.find((item) => {
            return item.id === itemId
        })
    )
    
}
