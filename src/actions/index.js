import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    console.log('about to fetch posts')
    await dispatch(fetchPosts())
    //_.map goes through all posts and pull of only userId properties
    //will return array of userIds
    //_uniq findss only unique ids
    //fetchUser with each id in array
    const userIds = _.uniq(_.map(getState().posts, 'userId'))
    userIds.forEach(id => dispatch(fetchUser(id)))
}

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts')

    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data
    })
}

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`)

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    })
}






