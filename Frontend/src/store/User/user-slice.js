// import {createSlice} from '@reduxjs/toolkit';

// const userSlice = createSlice({
//     name:"user",
//     initialState:{
//         isAuthenticated:false,
//         loading:false,
//         user:null,
//         errors:null,
//         success:false
        
//     },
//     reducers:{
//         getSignupRequest(state){
//             state.loading=true;

//         },
//         getSignupDetails(state,action){
//             state.user = action.payload,
//             state.isAuthenticated = true,
//             state.loading = false
//         },
//         getLoginDetails(state){
//             state.loading = true
//         },
//         getLoadingDetails(state,action){
//             state.user = action.payload,
//             state.isAuthenticated = true,
//             state.loading = false

//         },
//         getError(state,action){
//             state.errors = action.payload;
//             state.loading= false
//         },
//         getCurrentRequest(state){
//             state.loading= true;
//         },
//         getUpdateUserRequest(state){
//             state.loading= true;
//         },
//         getCurrentUser(state,action){
//             state.user = action.payload,
//             state.isAuthenticated = true,
//             state.loading = false

//         },
//         getLogoutRequest(state){
//             state.loading= true;
//         },
//         getLogout(state,action){
//             state.user = action.payload,
//             state.isAuthenticated = false,
//             state.loading = false

//         },
//         getPasswordRequest(state){
//             state.loading = true
//         },
//         getPasswordSuccess(state,action){
//             state.success = action.payload;
//             state.loading = false
//         },
//         clearErrors(state){
//             state.errors = null;
//         }
//     }
// })

// export const userActions = user.actions;
// export default userSlice ; 

// //it knows how to update the redux state

//from ai 


import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: null,
        success: false
    },

    reducers: {
        getSignupRequest(state) {
            state.loading = true;
        },

        getSignupDetails(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        getLoginRequest(state) {
            state.loading = true;
        },

        getLoginDetails(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        getError(state, action) {
            state.errors = action.payload;
            state.loading = false;
        },

        getCurrentRequest(state) {
            state.loading = true;
        },

        getUpdateUserRequest(state) {
            state.loading = true;
        },

        getCurrentUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        getLogoutRequest(state) {
            state.loading = true;
        },

        getLogout(state, action) {
            state.user = action.payload;
            state.isAuthenticated = false;
            state.loading = false;
        },

        getPasswordRequest(state) {
            state.loading = true;
        },

        getPasswordSuccess(state, action) {
            state.success = action.payload;
            state.loading = false;
        },

        clearErrors(state) {
            state.errors = null;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;
