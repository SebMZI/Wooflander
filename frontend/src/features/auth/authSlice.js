const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name: "auth",
    initialState: {token: null, roles: {}},
    reducers: {
        setCredentials: (state, action) =>{
            const data = action.payload.result.data;
            console.log(data);
            if(data){
                state.token = data.token
                state.roles = data.roles
            }
        }
    }
})

export const {setCredentials} = authSlice.actions

export default authSlice.reducer