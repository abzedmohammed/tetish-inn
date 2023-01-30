import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	creditSuccess: false,
	error: '',
	amount: 0,
};

export const updateAccount = createAsyncThunk(
	'accountSlice/updateAccount',
	(data) => {
		return axios
			.patch(`http://localhost:3000/accounts/${data.user_id}`, data)
			.then((res) => res.data);
	},
);

export const getAccount = createAsyncThunk('accountSlice/getAccount', (id) => {
	return axios
		.get(`http://localhost:3000/accounts/${id}`)
		.then((res) => res.data);
});

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		cleanUpAccount: state => {
			state.creditSuccess = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAccount.fulfilled, (state, action) => {
			state.amount = action.payload.amount;
		});

		builder.addCase(updateAccount.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateAccount.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
			state.creditSuccess = true;
			state.amount = action.payload.amount;
		});
		builder.addCase(updateAccount.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			state.creditSuccess = false;
		});
	},
});

export default accountSlice.reducer;
export const { cleanUpAccount } = accountSlice.actions
