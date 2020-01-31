import * as firebase from 'firebase';
import PlayerFirebaseParams from '../dtos/playerFirebaseParams';
import CoinFirebaseParams from '../dtos/coinFirebaseParams';
import RoomFirebaseParams from '../dtos/roomFirebaseParams';

export default class ConnectionManager {
  public firebaseDB: any;
  public gameGuid: string;
  public connected: boolean = false;
  public error: boolean = false;
  public errorMessage: string = '';
  public waitingPlayer: boolean = false;
  public isHost: boolean = false;
  public changedGameState: boolean = false;
  public playerTurn: number = 1;
  public myTurn: boolean = false;
  public player1: PlayerFirebaseParams = {
    rotation: 0,
    inverted: false,
    x: 0,
    y: 0,
  };
  public player2: PlayerFirebaseParams = {
    rotation: 0,
    inverted: false,
    x: 0,
    y: 0,
  };
  public coin3: CoinFirebaseParams = {
    x: 0,
    y: 0,
    active: false,
  };
  public coin4: CoinFirebaseParams = {
    x: 0,
    y: 0,
    active: false,
  };
  public selectingCoin: boolean = false;
  public coinRound: boolean = false;
  public updateTurnAfterStateChange: boolean = false;
  private query: string = '?game=';

  constructor () {
    this.initFirebaseConfigs();
    this.initRoom();
  }

  public async initListeners(): Promise<void> {
    this.firebaseDB.ref(this.gameGuid).on('value', async (snapshot: any) => {
      this.player1.x = snapshot.val().room.player1.x;
      this.player1.y = snapshot.val().room.player1.y;
      this.player2.x = snapshot.val().room.player2.x;
      this.player2.y = snapshot.val().room.player2.y;
      this.player1.rotation = snapshot.val().room.player1.rotation;
      this.player1.inverted = snapshot.val().room.player1.inverted;
      this.player2.rotation = snapshot.val().room.player2.rotation;
      this.player2.inverted = snapshot.val().room.player2.inverted;
      this.coin3.x = snapshot.val().room.coin3.x;
      this.coin3.y = snapshot.val().room.coin3.y;
      this.coin3.active = snapshot.val().room.coin3.active;
      this.coin4.x = snapshot.val().room.coin4.x;
      this.coin4.y = snapshot.val().room.coin4.y;
      this.coin4.active = snapshot.val().room.coin4.active;

      this.updateTurnAfterStateChange = snapshot.val().room.updateTurnAfterStateChange;

      this.selectingCoin = snapshot.val().room.selectingCoin;
      this.coinRound = snapshot.val().room.coinRound;

      if (snapshot.val().room.players == 2) {
        this.connected = true;
      }

      this.changedGameState = snapshot.val().room.changedGameState;

      if (this.playerTurn != snapshot.val().room.turn) {
        this.playerTurn = snapshot.val().room.turn;
      }

      if (this.isHost && (this.playerTurn == 1)) {
        this.myTurn = true;
      } else if (!this.isHost && (this.playerTurn == 2)) {
        this.myTurn = true;
      } else {
        this.myTurn = false;
      }
    });
  }

  private initFirebaseConfigs(): void {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyB1HSScBEQaZjF_aVt5CNcZURPfLneqjXE",
        authDomain: "hardest-easy.firebaseapp.com",
        databaseURL: "https://hardest-easy.firebaseio.com",
        projectId: "hardest-easy",
        storageBucket: "hardest-easy.appspot.com",
        messagingSenderId: "836716703236",
        appId: "1:836716703236:web:c551e3f13ed0c28a0b4f51",
        measurementId: "G-NV3XZP9BVW"
      });
      firebase.analytics();
    }

    this.firebaseDB = firebase.database();
  }

  private updateUrl(): void {
    window.history.pushState('game', 'L', `${this.query}${this.gameGuid}`);
  }

  private initRoom(): void {
    if(this.isGuid(this.getUrlGuid())) {
      this.joinRoom();
    }
    else {
      this.createRoom();
    }
  }

  private async joinRoom(): Promise<void> {
    this.gameGuid = this.getUrlGuid();

    this.firebaseDB.ref(this.gameGuid).once('value', async(snapshot) => {
      if (snapshot.exists()){
        if(snapshot.val().room.players != 2) {
          this.connected = true;
          this.initListeners();
          this.firebaseDB.ref(this.gameGuid).child('room').update({
            players: 2
          });
        } else {
          this.error = true;
          this.errorMessage = 'Room is full';
        }
       } else {
        this.error = true;
        this.errorMessage = 'Room not found!';
       }
    });
  }

  private createRoom(): void {
    this.gameGuid = this.generateGuid();

    this.firebaseDB.ref(this.gameGuid).set({
      room: <RoomFirebaseParams>{
        players: 1,
        turn: 1,
        winner: 0,
        changedGameState: false,
        coinRound: false,
        selectingCoin: false,
        updateTurnAfterStateChange: false,
        player1: <PlayerFirebaseParams>{
          rotation: 0,
          inverted: false,
          x: 50,
          y: 0,
        },
        player2: <PlayerFirebaseParams>{
          rotation: 0,
          inverted: false,
          x: 0,
          y: 0,
        },
        coin3: <CoinFirebaseParams>{
          x: 0,
          y: 0,
          active: false,
        },
        coin4: <CoinFirebaseParams>{
          x: 0,
          y: 0,
          active: false,
        },
      },
    });
    this.updateUrl();
    this.waitingPlayer = true;
    this.isHost = true;
    this.initListeners();
  }

  private getUrlGuid(): string {
    const url = window.location.href;
    const paramIndex = url.indexOf(this.query) + this.query.length;
    const queryGuid = url.substring(paramIndex);

    return queryGuid;
  }

  private generateGuid(): string {
    return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, (c: any) =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  private isGuid(test: string): boolean{
    var regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i;
    var match = regex.exec(test);
    return match != null;
  }

  public destroy(): void {
    this.firebaseDB = null;
  }
}