export default interface PlayerParams{
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  color: string;
  myTurn: boolean;
  playerNumber: number;
}