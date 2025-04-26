
import{createSlice,configureStore} from "@reduxjs/toolkit"

const expenseStore=createSlice({
    name:"expense",
    initialState:[],
    reducers:{
        updateData(state,action){
            return action.payload
        }
    }
})


export const store=configureStore({
    reducer:{
        expense:expenseStore.reducer
    }
})
export const action=expenseStore.actions


