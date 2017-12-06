import { axiosAuthInstance } from './auth'

export function loadRivers() {
    return (dispatch) => {
        axiosAuthInstance.get("stream")
            .then((response) => {
                dispatch({
                    type: "SET_RIVERS",
                    rivers: response.data
                });
            })
            .catch((err) => {
                console.error(err);
            })
    }
}

export function loadFavorites() {
    console.log("happening here too")
    return (dispatch) => {

        axiosAuthInstance.get("api/favorite")
            .then((response) => {
                dispatch({
                    type: "SET_FAVORITES",
                    favorites: response.data.favoriteStreams
                });
            })
            .catch((err) => {
                console.log(err, ": err")
                if(err.response.statusText === "Unauthorized"){
                  dispatch({
                      type: "SET_FAVORITES",
                      favorites: []
                  });
                };

            })
    }
}

export function clearFavorites(){
  return {
    type: "CLEAR_FAVORITES"
  }
}

export function updateParam(which, streamId, param) {
  if (!isNaN(param)){
    return (dispatch) => {
      axiosAuthInstance.put("api/favorite/param/"+which+streamId, { param })
      .then((response) => {

      })
    }
  }
  return {
    type: "DO_NOTHING"
  };
}

export function actionFavorite(_id){
  return (dispatch) => {
    axiosAuthInstance.post("api/favorite/", {_id})
    .then((response) => {
        dispatch({
            type: "ADD_FAVORITE",
            favorites: response.data.favoriteStreams
        });

    })
  }
}

export function actionUnFavorite(_id){
  return (dispatch) => {
    axiosAuthInstance({method:"delete", url:"api/favorite/", data:{_id}})
    .then((response) => {
        dispatch({
            type: "REMOVE_FAVORITE",
            favorites: response.data.favoriteStreams
        });

    })
  }
}



export function submitRiver({url, knownTitle}){
  return (dispatch, getState) => {
    let site = url.match(/\d/g).join("");

    axiosAuthInstance.post("stream/", {site, knownTitle})
    .then(response=>{
      const {rivers} = getState().mainReducer

      dispatch({
          type: "ADD_RIVER",
          river: response.data,
          rivers
      });
    })
  }
}
