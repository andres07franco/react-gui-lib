
function messageReducer(
    state = {
        message: '',
        messageType: 'alert-success',
        showMessage: false
    },
    action) {

    switch (action.type) {
        case "SHOW_SUCCESS":
            return {
                ...state,
                showMessage: true,
                message:action.message,
                messageType:'alert-success'
            }
        case "SHOW_INFO":
            return {
                ...state,
                showMessage: true,
                message:action.message,
                messageType:'alert-info'
            }
        case "SHOW_WARNING":
            return {
                ...state,
                showMessage: true,
                message:action.message,
                messageType:'alert-warning'
            }
        case "SHOW_ERROR":
            return {
                ...state,
                showMessage: true,
                message:action.message,
                messageType:'alert-danger'
            }
            case "CLOSE":
            return {
                ...state,
                showMessage: false,
                message:'',
                messageType:'alert-info'
            }            
        default:
            return state
    }
}

export default messageReducer