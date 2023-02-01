import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const cartItems = JSON.parse(localStorage.getItem('cart')) || []
const total = localStorage.getItem('total') || 0


const manipulateCart = (item) => {
    localStorage.setItem('cart', JSON.stringify(item))
}

const initialState = {
  loading: false,
  snacks: [],
  singleSnack: {},
  error: '',
  cart: cartItems,
  totalPrice: total,
}

export const fetchSnacks = createAsyncThunk('snacks/fetchSnacks', () => {
    return axios.get("http://localhost:3000/snacks")
    .then(res => res.data)
})

export const addSnack = createAsyncThunk('snacks/addSnack', (data) => {
    return axios.post("http://localhost:3000/snacks", data)
    .then(res => res.data)
})

export const fetchSnackById = createAsyncThunk('snacks/fetchSnackById', (id) => {
    return axios.get(`http://localhost:3000/snacks/${id}`)
    .then(res => res.data)
})

const snackSlice = createSlice({
    name: 'snacks',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (state.cart.find(item => action.payload.id === item.id)) return state
            let newCartItem = {...action.payload, quantity: 1, subtotal: action.payload.price}
            state.cart.push(newCartItem)
            // setItemsToCart(newCartItem)
            manipulateCart(state.cart)

            return state
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
            manipulateCart(state.cart)
            return state
        },

        incrementItem: (state, action) => {
            let index = state.cart.findIndex(item => item.id === action.payload)
            state.cart[index].quantity += 1
            state.cart[index].subtotal +=  state.cart[index].price
            manipulateCart(state.cart)
        },

        decrementItem: (state, action) => {
            let index = state.cart.findIndex(item => item.id === action.payload)
            if (state.cart[index].quantity === 1) return state
            state.cart[index].quantity -= 1 
            state.cart[index].subtotal -=  state.cart[index].price
            manipulateCart(state.cart)
        },

        getTotal: (state) => {
            state.totalPrice = state.cart.reduce((acc, item) => {
              let average = acc + item.price * item.quantity
            //   setTotalToCart(average)
            localStorage.setItem('total', JSON.stringify(average))
              return average
            }, 0)
          },

        emptyCart: state => {
            state.cart = []
            state.totalPrice = 0
            localStorage.clear()
        },
    },
    extraReducers: builder => {
      builder.addCase(fetchSnacks.pending, state => {
          state.loading = true
      })
  
      builder.addCase(fetchSnacks.fulfilled, (state, action) => {
          state.loading = false
          state.snacks = action.payload
          state.error = ''
      })
  
      builder.addCase(fetchSnacks.rejected, (state, action) => {
          state.loading = false
          state.snacks = []
          state.error = action.error.message
      })
  
      builder.addCase(fetchSnackById.fulfilled, (state, action) => {
          state.singleSnack = action.payload
      })
  
      builder.addCase(addSnack.pending, (state) => {
          state.loading = true
      })
  
      builder.addCase(addSnack.fulfilled, (state, action) => {
          state.loading = false
          state.snacks.push(action.payload)
          state.error = ''
      })
  
      builder.addCase(addSnack.rejected, (state, action) => {
          state.loading = false
          state.error = action.error.message
      })

    }
})

export default snackSlice.reducer

export const { addToCart, removeFromCart, incrementItem, decrementItem, getTotal, emptyCart } = snackSlice.actions