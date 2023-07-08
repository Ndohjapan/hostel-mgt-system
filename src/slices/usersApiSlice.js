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
    }),

    getStudent: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/${data.userId}`,
        method: "GET",
        headers: {
          "x-access-token": (data.token)
        }
      }),
    }),

    getHostels: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/hostel`,
        method: "GET",
        headers: {
          "x-access-token": (data.token)
        }
      }),
    }),

    getAvailableRooms: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/room/available/${data.roomId}`,
        method: "GET",
        headers: {
          "x-access-token": (data.token)
        }
      }),
    }),

    getStudentsInroom: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/filter?page=${data.page}&limit=${data.limit}`,
        method: "POST",
        headers: {
          "x-access-token": (data.token)
        },
        body: {room: data.room}
      }),
    }),

    removeFromRoom: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/remove`,
        method: "POST",
        headers: {
          "x-access-token": (data.token)
        },
        body: {userId: data.userId}
      }),
    }),

    assignToRoom: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/assign`,
        method: "POST",
        headers: {
          "x-access-token": (data.token)
        },
        body: {userId: data.userId, roomId: data.roomId}
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetStudentsMutation, useGetStudentMutation, useGetHostelsMutation, useGetAvailableRoomsMutation, useGetStudentsInroomMutation, useRemoveFromRoomMutation, useAssignToRoomMutation } = usersApiSlice;
