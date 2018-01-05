(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
         * @desc Album object stores the album info
         * @type {Object} albums
         */
        var currentAlbum = Fixtures.getAlbum();



         var currentBuzzObject = null;


 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
   var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

        currentSong = song;

    /**
    * @function getSongIndex
    * @desc return index of songs
    * @param {Object} index
    *@returns{Number}
    */
    var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };


/**
* @desc Active song object from list of songs
* @type {Object}
*/
        SongPlayer.currentSong = null;
 };


 /**
* @function playSong
* @desc play current Buzz object and set property of song to true.
* @param {Object} song
*/
     var playSong = function () {
      currentBuzzObject.play();
      song.playing = true;
   };

       SongPlayer.currentSong = null;
     }

       var stopSong = function() {
        currentBuzzObject.stop();
        song.playing = null;
      };
   /**
   * @function SongPlayer.play
   * @desc if current Buzz object is not the same song which user chose set this song to current and play, and if it's same song and current Buzz song is paused, it start to play
   * @param {Object} song
   */
      SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong();
       }  else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
       }
     };


     /**
     * @function SongPlayer.pause
     * @desc pause  current Buzz object and set property of song to false.
     * @param {Object} song
     */
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
 };


 /**
 * @function SongPlayer.previous
 * @desc make var for currentSongIndex and store currentSong index there and make it less to  every time it runs.
 * @param {Object} index
 */
 SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;

     if (currentSongIndex < 0) {
        stopSong(song);
    }else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };

 /**
 * @function SongPlayer.next
 * @desc make var for currentSongIndex and store currentSong index there and make it less to  every time it runs.
 * @param {Object} index
 */
 SongPlayer.next = function() {
     var currentsongIndex = getSongIndex(SongPlayer.currentSong);
     currentsongIndex++;

     if (currentsongIndex > currentAlbum.songs.length) {
        stopSong(song);
    }else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer);
})();
