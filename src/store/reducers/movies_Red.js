export default function(state = {
    MID: {}
}, action) {
    switch (action.type) {
        case 'MOVIEID':   
            return {
                ...state,
                MID: action.obj
            }        
        default:
            return state
    }
}