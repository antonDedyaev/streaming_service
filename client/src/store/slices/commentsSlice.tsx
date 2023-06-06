import IComment from "@/models/IComment";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface commentsState {
    comments: IComment[]
}

const initialState: commentsState = {
    comments: []
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments(state, action: PayloadAction<IComment[]>) {
            state.comments = action.payload;
        },
        addNewComment(state, action: PayloadAction<IComment>) {
            state.comments.push(action.payload);
        },
        addChildComment(state, action: PayloadAction<IComment>) {
            const parent = state.comments.find(el => el.id === action.payload.parentId);
            if (parent) {
                parent.childComment?.push(action.payload);
            }
        }
    },
});

export default commentsSlice.reducer;
