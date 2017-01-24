describe('playlist', function () {
  describe('$filter: playlist', function () {
    beforeEach(module('playlist'))

    beforeEach(inject(function($filter, Playlist){
      var baseTime = new Date(2013, 9, 23);

      jasmine.clock().install()

      jasmine.clock().mockDate(baseTime);


      [1,2,3,4,5,6,7,8,9,10,11].forEach(function (timestamp) {
        Playlist.patch({ __selected: true, image: timestamp, notes: timestamp, id: timestamp, name: timestamp })

        jasmine.clock().tick(1)
      })


      this.playlist = $filter('playlistPresenter')(Playlist)
    }))

    afterEach(function () {
      jasmine.clock().uninstall()
    })

    it('limits the output to 10 items', function () {
      var subject = this.playlist.tracks.length

      expect(subject).toEqual(10)
    })

    it('orders the list with preference for recent additions', function () {
      var timestamp_iterator = 1382500800011,

          subject = this.playlist,

          expectedOutput = [11,10,9,8,7,6,5,4,3,2].map(function (id) {
            return {
              image: id,
              notes: id,
              name: id,
              __created_at: timestamp_iterator -= 1
            }
          })

      expect(subject).toEqual({ name: undefined, tracks: expectedOutput })
    })
  })
})
