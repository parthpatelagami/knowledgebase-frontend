// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'

export const getBookmarks = createAsyncThunk('layout/getBookmarks', async () => {

  // Fetch bookmarks from the localstorage
  const storeBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []

  // ** convert navigation data object as per bookmark feature require formate
  const suggestion = []
  const bookmarks = []
  const iterate = (dataArray) => {
    dataArray.forEach(item => {
      if (item.children && item.children.length) {
        iterate(item.children)
      } else {
        const objFormat = {
          id: item.id,
          target: item.id,
          isBookmarked: storeBookmarks.includes(item.id),
          title: item.title,
          icon: item.icon,
          link: item.navLink
        }
        suggestion.push(objFormat)
        if (objFormat.isBookmarked) bookmarks.push(objFormat)
      }
    })
  }
  iterate(navigation)

  return {
    data: suggestion,
    bookmarks
  }
})

export const updateBookmarked = createAsyncThunk('layout/updateBookmarked', async id => {
  return id
})

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    query: '',
    bookmarks: [],
    suggestions: []
  },
  reducers: {
    handleSearchQuery: (state, action) => {
      state.query = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.suggestions = action.payload.data
        state.bookmarks = action.payload.bookmarks
      })
      .addCase(updateBookmarked.fulfilled, (state, action) => {
        let objectToUpdate

        // ** find & update object
        state.suggestions.find(item => {
          if (item.id === action.payload) {
            item.isBookmarked = !item.isBookmarked
            objectToUpdate = item
          }
        })

        // ** Get index to add or remove bookmark from array
        const bookmarkIndex = state.bookmarks.findIndex(x => x.id === action.payload)

        // Fetch bookmarks from the localstorage
        let storeBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []

        if (bookmarkIndex === -1) {
          state.bookmarks.push(objectToUpdate)
          storeBookmarks.push(objectToUpdate.target)
        } else {
          state.bookmarks.splice(bookmarkIndex, 1)
          storeBookmarks = storeBookmarks.filter(item => item !== objectToUpdate.target)
        }

        // Update bookmarks into the localstorage
        localStorage.setItem('bookmarks', JSON.stringify(storeBookmarks))

      })
  }
})

export const { handleSearchQuery } = layoutSlice.actions

export default layoutSlice.reducer
