import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";


const initialState ={
    loading: false,
    orderSuccess: false,
    error: '',
    orderDeleted: false,
}

export const makeOrder = createAsyncThunk('orderSlice/makeOrder', data => {
    return axios.post("http//:localhost:3000/orders", data).then(res => res.data)
})

// export const getOrders = createAsyncThunk('orderSlice/getOrders', () => {
//     return axios.get("http//:localhost:3000/orders").then(res => res.data)
// })

export const editOrder = createAsyncThunk('orderSlice/editOrder', (id, data) => {
    return axios.patch(`http//:localhost:3000/orders/${id}`, data).then(res => res.data)
})

export const deleteOrder = createAsyncThunk('orderSlice/deleteOrder', id => {
    return axios.delete(`http//:localhost:3000/orders/${id}`).then(res => res.data)
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: state => {
            state.orderSuccess = false;
        }
    },

    extraReducers: builder => {
        builder.addCase(makeOrder.pending, state => {
            state.loading = true
        })
        builder.addCase(makeOrder.fulfilled, state => {
            state.loading = false
            state.orderSuccess = true
            state.error = ''
        })
        builder.addCase(makeOrder.rejected, (state, action) => {
            state.loading = false
            state.orderSuccess = false
            state.error = action.payload.message
        })


        builder.addCase(editOrder.pending, state => {
            state.loading = true
        })
        builder.addCase(editOrder.fulfilled, state => {
            state.loading = false
            state.orderSuccess = true
            state.error = ''
        })
        builder.addCase(editOrder.rejected, (state, action) => {
            state.loading = false
            state.orderSuccess = false
            state.error = action.payload.message
        })


        // builder.addCase(getOrders.fulfilled, state => {
        //     return state
        // })


        builder.addCase(deleteOrder.fulfilled, state => {
            state.orderDeleted = true
        })
    }
})


export default orderSlice.reducer
export const { reset } = orderSlice.actions
