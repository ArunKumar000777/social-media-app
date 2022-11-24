import { apiSlice } from "../../app/api/apiSlice";


const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChats: builder.query({
            query: (userId)=>({
                url:`/chat/${userId}`,
                method: 'GET'
            })
        }),
        getMessages: builder.query({
            query: (messageId)=>({
                url:`/message/${messageId}`,
                method: 'GET'
            })
        })
    })
})

export const {useGetChatsQuery,useGetMessagesQuery} = chatApiSlice