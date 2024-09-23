
const empty = ' ';
//@ts-ignore
const player1 = 'X';
const player2 = 'O';
const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstCol = 0;
const secondCol = 1;
const thirdCol = 2;

const invalidFirstPlayerError = 'Invalid first player';
const invalidNextPlayerError = 'Invalid next player';
const invalidPositionError = 'Invalid position';

export class Game {
  private _lastSymbol = empty;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == empty) {
      if (player == player2) {
        throw new Error(invalidFirstPlayerError);
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error(invalidNextPlayerError);
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != empty) {
      throw new Error(invalidPositionError);
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(firstRow, firstCol)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(secondRow, firstCol)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(thirdRow, firstCol)!.Symbol;
    }

    return empty;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(firstRow, firstCol)!.Symbol != empty &&
      this._board.TileAt(firstRow, secondCol)!.Symbol != empty &&
      this._board.TileAt(firstRow, thirdCol)!.Symbol != empty
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(firstRow, firstCol)!.Symbol == this._board.TileAt(firstRow, secondCol)!.Symbol &&
      this._board.TileAt(firstRow, thirdCol)!.Symbol == this._board.TileAt(firstRow, secondCol)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
        this._board.TileAt(secondRow, firstCol)!.Symbol != empty &&
        this._board.TileAt(secondRow, secondCol)!.Symbol != empty &&
        this._board.TileAt(secondRow, thirdCol)!.Symbol != empty
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
        this._board.TileAt(secondRow, firstCol)!.Symbol == this._board.TileAt(firstRow, secondCol)!.Symbol &&
        this._board.TileAt(secondRow, thirdCol)!.Symbol == this._board.TileAt(firstRow, secondCol)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
        this._board.TileAt(thirdRow, firstCol)!.Symbol != empty &&
        this._board.TileAt(thirdRow, secondCol)!.Symbol != empty &&
        this._board.TileAt(thirdRow, thirdCol)!.Symbol != empty
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
        this._board.TileAt(thirdRow, firstCol)!.Symbol == this._board.TileAt(thirdRow, secondCol)!.Symbol &&
        this._board.TileAt(thirdRow, thirdCol)!.Symbol == this._board.TileAt(thirdRow, secondCol)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstCol; j <= thirdCol; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: empty };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
