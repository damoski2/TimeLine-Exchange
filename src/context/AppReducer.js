
export default (state, action)=>{
    switch(action.type){

        case 'LOADING_FALSE':
            return{
                ...state,
                loading: false
            }

        case 'SET_DATA':
            const { key, _data } = action.payload
            console.log(key, _data)
            return {
                ...state,
                [key]: _data
            }

        case 'SET_ADDRESS':
            console.log(action.payload)
            return{
                ...state,
                account: action.payload
            }
    }
}