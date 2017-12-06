import React from 'react'

 import River from './River'
 import Favorite from '../favorite/Favorite'

 export default function RiverList(props) {
      const styles = {
        maxHeight: "500px",
        overflow: "auto"
      }

       const riverList = props.rivers.filter(river=>river.knownTitle.toLowerCase().indexOf(props.search.toLowerCase()) >= 0)
       .map((river, index) =>{
             return <River key={index} id={index} item={river}
               handleActionFavorite={props.handleActionFavorite}/>
           }
       );

       const favoritesList = props.favorites.filter(river=>river.stream.knownTitle.toLowerCase().indexOf(props.search.toLowerCase()) >= 0)
       .map((river, index) =>{
               return <Favorite
                 upper={river.upperParam}
                 lower={river.lowerParam}
                 key={river._id} id={river._id} item={river.stream}
                 handleActionUnFavorite={props.handleActionUnFavorite}/>
             }
       )
       return (
         <div style={styles}>
           {favoritesList}
           {riverList}
         </div>
       )


 }
