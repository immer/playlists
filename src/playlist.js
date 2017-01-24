// @todo split this file into component files

var add,
    patch,
    setter,
    spotifyConfig,
    Playlist,
    PlaylistPresenter;

/*
 * @doc module: playlist
 *
 * @todo secure the spotify clientId config
 */
angular.module('playlist', ['spotify']).
  config(spotifyConfig).


  service('Playlist', Playlist).


  filter('playlistPresenter', PlaylistPresenter).


  controller('PlaylistController', ['$scope', 'Spotify', 'Playlist', function ($scope, Spotify, Playlist) {
    function setTracks (data) {
      $scope.tracks = data.tracks.items
    }

    $scope.playlist = Playlist

    $scope.search = function () {
      Spotify.search($scope.q, 'track').then(setTracks)
    }
  }])


//
// Presenter class which "extends" $filter
function PlaylistPresenter ($filter) {
  // mix in the filters we need for presentation logic
  var limitTo = $filter('limitTo'),
      orderBy = $filter('orderBy')

  // Playlist presenter: Represent arbitrary selections as an ordered list
  // (desc, on the time items were added, with a preference for recent
  // additions). The sorted list is limited to 10 results, and presented
  // accorinding to the requirements
  return function (playlist) {
    var list = playlist.data.values,
        sortedList = orderBy(list, '-__created_at')
        desc = limitTo(sortedList, 10) || []

    return {
      name: playlist.name,
      tracks: desc.map(function (obj) {
        // TODO fill this in with the values as per requirements
        return {
          image: obj.image,
          notes: obj.notes,
          name: obj.name,
          __created_at: obj.__created_at
        }
      })
    }
  }
}



/*
 * @doc function: insert
 *
 * @description:
 *
 * Writes tracks to the playlist using the track's id as a "primary key"
 */
function insert (track) {
  var timestamp = Date.now(),
      __set = setter.bind(this)

  track.__created_at = timestamp

  this.tracks[track.id] = track

  // quack
  __set()

  return track
}

/*
 * @doc function: patch
 *
 * @description
 *
 * patch is invoked through ng-change. The event's srcElem is a checkbox, so it
 * toggles the boolean track.__selected. This acts as a flag to mark
 * write/destroy
 */
function patch (track) {
  var __insert = insert.bind(this),
      __set = setter.bind(this)

  track.__selected ? __insert(track)
                   : delete this.tracks[track.id]
  // quack
  __set()

  return track.__selected
}

/*
 * @doc function: setter
 *
 * @description
 *
 * During construction of the Playlist service, setter is bound to the
 * playlist's scope. When tracks are added to the playlist, setter is called. We
 * might think of this as eagerly loading playlist tracks (for JSON export)
 * on write instead of lazily. This way, the data is ready to go before the user
 * knows they want it.
 */

function setter () {
  var keys = Object.keys(this.tracks),
      memo = [];

  for ( var i = 0; i < keys.length; i ++ ) {
    var track_id = keys[i]

    memo.push(this.tracks[track_id])
  }

  this.values = memo

  return this.values
}

/*
 * @doc model: Playlist
 *
 * @description
 *
 * Keeps track of playlist selections.
 *
 * When Playlist#patch is received, the id of the track being added is used to
 * store the track in hash. Depending on whether the track is "__selected" the
 * track will be added to or deleted from the hash.
 *
 * Following a ruby-esque "Duck Typing" approach, whenever a track is added or
 * deleted to/from the model, a subroutine is called, which sets
 * Playlist.values. This way, Playlist behaves like a JavaScript object, in that
 * it's keys and values are accessible via Object#keys and Playlist#values. NB
 * only Playlist#values is exposed publicly. (Playlist#values returns the "raw"
 * selections data which is filtered based on the requirements of the
 * presentation logic.
 *
 * @usage
 *
 * In a controller
 *
 * angular.module('app').
 *   controller(['$scope', 'Playlist', function ($scope, Playlist) {
 *     $scope.patch = Playlist.patch
 *   }])
 */

function Playlist () {
  var data = {
    tracks: {},
    values: []
  }

  function Playlist () {
    this.data = data

    this.patch = patch.bind(data)
  }

  return new Playlist
}


/*
 * @doc function: spotifyConfig
 *
 * @description
 *
 * This callback configures the SpotifyProvider with a minimal set of options
 * The config is currently incomplete and doesn't support all API operations;
 * only enough to get this demo going.
 */

function spotifyConfig (SpotifyProvider) {
  SpotifyProvider.setClientId('8b1dfded3cc4489cb354819f0a9f42ec');

  SpotifyProvider.setRedirectUri('http://localhost:3000/');

  SpotifyProvider.setScope('playlist-read-private');
}


