import ConnectionManager from "../managers/connectionManager";

export default interface CoinParams{
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  color: string;
  coinNumber: number;
  connectionManager: ConnectionManager;
}