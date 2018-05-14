function ttt_new_game() {
  var ttt_board = _.times(9, _.constant('.'));
  console.log(ttt_display_board(ttt_board))
  _.times(4, function(){
    ttt_turn(ttt_board)
  })
  ttt_turn(ttt_board, {player1Only: true})
}

function ttt_turn(ttt_board, options) {
    ttt_player_plays('', ttt_board, 'player1', 'x')
    if (!_.get(options, 'player1Only')) {
      ttt_player_plays('', ttt_board, 'player2', 'o')
    }
}

function ttt_check_win(ttt_board, playerName, coinAppearance) {
  var winning_combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  _.each(winning_combinations, function(winning_combination){
    if (_.every(winning_combination, function(e){return ttt_board[e] === coinAppearance})) {
      throw playerName + ' WON !!!! ' + winning_combination + ' ' + JSON.stringify(ttt_board);
    }
  })
}

function ttt_display_board(t) {
  return t[0] + t[1] + t[2] + '\n' + t[3] + t[4] + t[5] + '\n' + t[6] + t[7] + t[8]
}

function ttt_player_plays(errorMessage, ttt_board, playerName, coinAppearance) {
  var r = prompt(errorMessage + ' ' + playerName + ', please choose 1-9 or q')
  var nb = _.toInteger(r)
  if (nb >= 1 && nb <= 9) {
    if (ttt_board[r - 1] === '.') {
      ttt_board[r - 1] = coinAppearance
      console.log(ttt_display_board(ttt_board))    
      ttt_check_win(ttt_board, playerName, coinAppearance)      
      return
    } else {
      ttt_player_plays('error : non empty box, play again', ttt_board, playerName, coinAppearance)
    }
  } else if (r === 'q') {
    throw playerName + ' wants to stop, bye'
  } else {
    ttt_player_plays('I didnt understand, play again', ttt_board, playerName, coinAppearance)
  }
}

clear()
ttt_new_game()

