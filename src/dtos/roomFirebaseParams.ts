import PlayerFirebaseParams from "./playerFirebaseParams"
import CoinFirebaseParams from "./coinFirebaseParams"

export default interface RoomFirebaseParams{
  players: number;
  turn: number,
  winner: number,
  changedGameState: boolean,
  coinRound: boolean,
  selectingCoin: boolean,
  updateTurnAfterStateChange: boolean,
  player1: PlayerFirebaseParams;
  player2: PlayerFirebaseParams;
  coin3: CoinFirebaseParams;
  coin4: CoinFirebaseParams;
}