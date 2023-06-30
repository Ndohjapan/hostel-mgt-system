import { apiSlice } from "./apiSlice";

const USERS_URL = "https://hostel-mgt-staging-0b2f0879c515.herokuapp.com/api/1.0";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    getStudents: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user?page=${data.page}&limit=${data.limit}`,
        method: "GET",
        headers: {
          "x-access-token": (data.token)
        }
      }),
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetStudentsMutation } = usersApiSlice;
