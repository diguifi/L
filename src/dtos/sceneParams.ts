import ConnectionManager from "../managers/connectionManager";
import Game from "..";

export default interface SceneParams{
  context: CanvasRenderingContext2D;
  name: string;
  active: boolean;
  game: Game;
  connectionManager: ConnectionManager
}