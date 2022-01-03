
export default (state, action)=>{
    switch(action.type){

        case 'LOADING_FALSE':
            return{
                ...state,
                loading: false
            }

        case 'SET_DATA':
            const { key, _data } = action.payload
            return{
                ...state,
                [key]: _data
            }
    }
}