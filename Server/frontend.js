//dynamic queries
// query reviewQuery ($id: ID!) {
//     review(id: $id){
//       rating
//     }
//   }

// query ratingQuery  {
//     reviews {
//       rating
//     }
//   }

// query  authorQuery ($id:ID!){
//     author(id:$id){
//       name
//       reviews {
//         content
//       }
//     }
//   }  variable {"id":"101"}

// query authorQuery(  $authorId: ID!){
//     author(id: $authorId) {
//       name, reviews {
//         content,_id
//       }
//     }
//   }

// query reviewNestedQuery ($id:ID!){
//     review(id:$id){
//     content,author {
//       id,name
//     },game {
//       title
//     }
//     }
//   }

// query authorQuery($authorId: ID!) {
//     author(id: $authorId) {
//      name , reviews {
//        content
//      }
//     }
//   }

//mutations
// mutation delGame($deleteGameId: ID!){
//     deleteGame(id: $deleteGameId) {
//       title,platform
//     }
//   }    {"deleteGameId": "1}

// mutation updateGame( $id:ID!, $game: GameInput!){
//     updateGame(id:$id,game:$game){
//       title, platform
//     }
//    }
// {
//     "id": "658a7af843a5131073ceee2e", "game": { "platform":[
//       "ps5","pc"
//     ], "title": "newly updated game4!!!"}
//   }

// mutation updateGame( $id:ID!, $game: GameInput!){
//     updateGame(id:$id,game:$game){
//       title,id
//     }
//    }
//    {
//     "id": "1", "game": {"id": "01", "platform":[
//       "pc only"
//     ], "title": "Updatedgame"}
//   }
