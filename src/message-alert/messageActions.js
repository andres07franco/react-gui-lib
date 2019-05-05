
export const messageActions = (dispatch) => ({

    showInfo:(message)=>{
        dispatch({
            type: 'SHOW_INFO',
            message
        })
        setTimeout(()=>dispatch({
            type: 'CLOSE'
        }),10000)
    },
    showError:(message)=>{
        dispatch({
            type: 'SHOW_ERROR',
            message
        })
        setTimeout(()=>dispatch({
            type: 'CLOSE'
        }),10000)
    },    
    showWarinig:(message)=>{
        dispatch({
            type: 'SHOW_WARNING',
            message
        })
        setTimeout(()=>dispatch({
            type: 'CLOSE'
        }),10000)
    },    
    showSuccess:(message)=>{
        dispatch({
            type: 'SHOW_SUCCESS',
            message
        })
        setTimeout(()=>dispatch({
            type: 'CLOSE'
        }),10000)
    },  
    close:()=>{
        dispatch({
            type: 'CLOSE'
        })
    },  
})