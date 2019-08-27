/**
 * Soma-FM API handler
 */
export default {

  // get channels data from api
  getArt( album_title, callback ) {
    const apiurl = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${album_title}&api_key=104fa33c7ae78a7df6bcdab8beace48f&format=json`;
    const error  = 'There was a problem fetching the album art. ';

    axios.get( apiurl ).then( res => {
      const art_url = this._parseResp( res.data.results.albummatches.album );
      if ( !art_url ) return callback( error, [] );
      return callback( null, art_url );
    })
    .catch( e => {
      return callback( error + String( e.message || '' ), [] );
    });
  },

//   // fetch songs for a channel
//   getSongs( channel, callback ) {
//     const apiurl = channel.songsurl || '';
//     const title  = channel.title || '...';
//     const error  = 'There was a problem loading the list of songs for channel '+ title +' from SomaFM.';

//     axios.get( apiurl ).then( res => {
//       if ( !res.data.songs ) return callback( error, [] );
//       return callback( null, res.data.songs );
//     })
//     .catch( e => {
//       return callback( error + String( e.message || '' ), [] );
//     });
//   },

  // parse channels list from api response
  _parseResp( albums ) {
    let output = [];
    if ( Array.isArray( albums ) ) {
      for ( let c of albums ) {
        if ( !Array.isArray( c.image ) ) continue;
        // console.log(c)
        let url   = c.image.filter( p => ( p.size === "extralarge" ) ).shift()['#text'] || null;
        // c.mp3file   = 'http://ice1.somafm.com/'+ c.id +'-128-mp3';
        // c.songsurl  = 'https://somafm.com/songs/'+ c.id +'.json';
        // c.infourl   = 'https://somafm.com/'+ c.id +'/';
        // c.twitter   = c.twitter ? 'https://twitter.com/@'+ c.twitter : '';
        // c.route     = '/channel/'+ c.id;
        // c.listeners = c.listeners | 0;
        // c.updated   = c.updated | 0;
        // c.favorite  = false;
        // c.active    = false;
        // c.url = c.
        // console.log(url);
        if ( url ) output.push( url );
      }
    }
    // console.log(output[0])
    return output[0];
  }
}
