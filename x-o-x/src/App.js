import {useState} from "react"
import "./style.css"
function App() { 

    const [currentPlayer, setCurrentPlayer] = useState("X") // şu anki oyuncuyu temsil eder
    const [squares, setSquares] = useState(Array(9).fill(null)) // bu değişken tahtadaki her bir kareyi tutar ve başlangıçta hepsi null olur.

    const calculateWinner = () => {
      {/* Kazananın olup olmadığını kontrol eden fonksiyondur */}
      const lines = [
        //kazanan kombinasyonlar
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
              }
          }

          return null;
      }

      const winner = calculateWinner();//bir kazanan var mı yok mu kontrol etme işlemi

    const handleClick = (i) => {
      /*bir kareye tıklama olayını işler. Eğer kare daha önce doluysa hiçbir işlev yapmaz.
      Dolu değilse currentPlayer sembolünü kareye yerleştirir ve sıradaki oyuncuyu değiştirir*/
        if(winner || squares[i] != null) return
        const nextSquares = squares.slice();
        nextSquares[i] = currentPlayer;
        setSquares(nextSquares);
        setCurrentPlayer(currentPlayer == "X" ? "O" : "X");
        
      }

    const renderSquare = (i) => {
      //bir kareyi temsil eden bir butonu döndüren yardımcı bir fonksiyondur.
        return(
            <button className="square" onClick={() => {
                handleClick(i)
            }}>
                {squares[i]}
            </button>
        )
    }

    const isBoardFull = squares.every((square) => square !== null);

    const resetGame = () => {
      //oyunu sıfırlar ve başlangıç durumuna geri getirilir.
        setCurrentPlayer('X');
        setSquares(Array(9).fill(null));
      };

  return (
    /*renderSquare fonksiyonunu kullanarak 3x3'lük kareler halinde oluşturulur. 
    Kazanan varsa kazananı gösterir ve oyunu sıfırlamak için bir düğme sunar; yoksa, sıradaki oyuncuyu gösterir.*/
    <div className="main">
      <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      {winner ? (
        <div className="winner-message">
            <p className="text">Winner: {winner}</p>
            <button className="reset" onClick={resetGame}>Reset Game</button>
        </div>
        ): isBoardFull ? (
            <div className="draw-message">
              <p className="text">It's a draw</p>
              <button className="reset" onClick={resetGame}>Reset Game</button>
            </div>
        ) : (
          <p className="next">Next Player: {currentPlayer}</p>
        )}
    </div>
    </div>
  )

}

export default App;
