import * as firebase from 'firebase';

export default class ConnectionManager {
  public firebaseDB: any;
  public gameGuid: string;
  public connected: boolean = false;
  public error: boolean = false;
  public waitingPlayer: boolean = false;
  private path: string = '/game/';

  constructor () {
    this.initFirebaseConfigs();
    this.initRoom();
  }

  public initListeners(): void {
    
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
    window.history.pushState('game', 'L', `${this.path}${this.gameGuid}`);
  }

  private initRoom(): void {
    if(this.isGuid(this.getUrlGuid())) {
      this.joinRoom();
    }
    else {
      this.createRoom();
    }
  }

  private joinRoom(): void {
    this.gameGuid = this.getUrlGuid();

    this.firebaseDB.ref(this.gameGuid).once('value', snapshot => {
      if (snapshot.exists()){
        this.connected = true;
       } else {
        this.error = true;
       }
    });
  }

  private createRoom(): void {
    this.gameGuid = this.generateGuid();

    this.firebaseDB.ref(this.gameGuid).set({
      room: {
        players: 1,
        turn: 1,
        winner: 0,
        board: [],
      },
    });
    this.updateUrl();
    this.waitingPlayer = true;
  }

  private getUrlGuid(): string {
    const path = window.location.pathname;
    return path.substring(this.path.length, path.length);
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