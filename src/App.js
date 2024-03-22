import { useState } from "react";
import "./App.css";
import "./index.js";

const App = () => {
  const [result, setResult] = useState("");

  const handleClick = (e) => {
    const stringifiedResult = result.toString();
    const clickedButtonValue = e.target.name;
    const finalResult = stringifiedResult.concat(clickedButtonValue);
    setResult(finalResult);
  };

  const clear = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, result.length - 1)); // or -1
  };

  const calculateResult = () => {
    try {
      setResult(calculate(tokenize(result)));
    } catch (err) {
      setResult("Error");
    }
  };

  function tokenize(s) {
    const r = [];
    let token = "";
    for (const character of s) {
      if ("^*/+-".includes(character)) {
        if (token === "" && character === "-") {
          token = "-";
        } else {
          r.push(parseFloat(token), character);
          token = "";
        }
      } else {
        token += character;
      }
    }
    if (token !== "") {
      r.push(parseFloat(token));
    }
    return r;
  }
  function calculate(tokens) {
    const operatorPrecedence = [
      { "^": (a, b) => Math.pow(a, b) },
      { "*": (a, b) => a * b, "/": (a, b) => a / b },
      { "+": (a, b) => a + b, "-": (a, b) => a - b },
    ];
    let operator;
    for (const operators of operatorPrecedence) {
      const newTokens = [];
      for (const token of tokens) {
        if (token in operators) {
          operator = operators[token];
        } else if (operator) {
          newTokens[newTokens.length - 1] = operator(
            newTokens[newTokens.length - 1],
            token
          );
          operator = null;
        } else {
          newTokens.push(token);
        }
      }
      tokens = newTokens;
    }
    if (tokens.length > 1) {
      console.log("Error: unable to resolve calculation");
      return tokens;
    } else {
      return tokens[0];
    }
  }

  return (
    <>
      <div className="app">
        <div className="Calculator">
          <form>
            <input type="text" value={result} />
          </form>
          <div className="keys">
            <div dataKey="clear" className="key action" id="clear">
              <button onClick={clear}>AC</button>
            </div>

            <div dataKey="percent" className="key action">
              <button name="%" onClick={handleClick}>
                %
              </button>
            </div>

            <div dataKey="/" className="key operator">
              <button name="/" onClick={handleClick}>
                /
              </button>
            </div>

            <div dataKey="7" className="key">
              <button name="7" onClick={handleClick}>
                7
              </button>
            </div>

            <div dataKey="8" className="key">
              <button name="8" onClick={handleClick}>
                8
              </button>
            </div>

            <div dataKey="9" className="key">
              <button name="9" onClick={handleClick}>
                9
              </button>
            </div>

            <div dataKey="*" className="key operator">
              <button name="*" onClick={handleClick}>
                X
              </button>
            </div>

            <div dataKey="4" className="key">
              <button name="4" onClick={handleClick}>
                4
              </button>
            </div>

            <div dataKey="5" className="key">
              <button name="5" onClick={handleClick}>
                5
              </button>
            </div>

            <div dataKey="6" className="key">
              <button name="6" onClick={handleClick}>
                6
              </button>
            </div>

            <div dataKey="-" className="key operator">
              <button name="-" onClick={handleClick}>
                -
              </button>
            </div>

            <div dataKey="1" className="key">
              <button name="1" onClick={handleClick}>
                1
              </button>
            </div>

            <div dataKey="2" className="key">
              <button name="2" onClick={handleClick}>
                2
              </button>
            </div>

            <div dataKey="3" className="key">
              <button name="3" onClick={handleClick}>
                3
              </button>
            </div>

            <div dataKey="+" className="key operator">
              <button name="+" onClick={handleClick}>
                +
              </button>
            </div>

            <div dataKey="backspace" className="key action">
              <button onClick={backspace} id="backspace">
                C
              </button>
            </div>

            <div dataKey="0" className="key">
              <button name="0" onClick={handleClick}>
                0
              </button>
            </div>

            <div dataKey="." className="key">
              <button name="." onClick={handleClick}>
                .
              </button>
            </div>

            <div dataKey="=" className="key operator">
              <button onClick={calculateResult} id="result">
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
