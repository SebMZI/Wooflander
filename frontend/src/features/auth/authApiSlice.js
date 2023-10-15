const { default: apiSlice } = require("@/api/api/apiSlice");

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/user/login",
                method: "POST",
                body: {...credentials}
            })
        })
    })
})

export const { useLoginMutation } = authApiSlice