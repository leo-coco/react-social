import { createAppSlice } from "../../app/createAppSlice"
import { likePost } from "./likeAPI"

export interface LikesSliceState {
  likes: Record<string, number>
  status: "idle" | "loading" | "failed"
}

const initialState: LikesSliceState = {
  status: "idle",
  likes: {
    "1": 10,
    "2": 20
  },
}


export const likeSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: create => ({
    likeAsync: create.asyncThunk(
      async (postId: string) => {
        const response = await likePost(postId)
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          const postId = action.meta.arg;
          state.likes[postId] = state.likes[postId] + 1 // we ignore result from mock API
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),

  selectors: {
    selectStatus: state => state.status,
    selectLikes: state  => (postId: string) => state.likes[postId],
  },
})


export const { likeAsync } = likeSlice.actions

export const { selectLikes } = likeSlice.selectors
