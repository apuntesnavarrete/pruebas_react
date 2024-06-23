import React, { useState } from 'react';

interface Game {
  gameTime: string;
  homeTeam: string;
  awayTeam: string;
  category: string;
}

const cleanInput = (input: string): string => {
  return input
    .replace(/\bvs\b/gi, '') // Elimina 'vs' solo si es una palabra separada
    .replace(/[^\w\s:_]/gi, '') // Elimina todos los caracteres que no sean letras, números, espacios, ':' o '_'
    .replace(/\s+/g, ' ') // Reemplaza múltiples espacios con uno solo
    .trim(); // Elimina espacios en blanco al inicio y al final
};

const parseGamesInput = (input: string): Game[] => {
  const lines = input.split(' ').filter(line => line.trim() !== '');
  const games: Game[] = [];

  for (let i = 0; i < lines.length; i += 4) {
    if (i + 3 < lines.length) {
      const gameTime = lines[i];
      const homeTeam = lines[i + 1];
      const awayTeam = lines[i + 2];
      const category = lines[i + 3];
      games.push({
        gameTime: gameTime.trim(),
        homeTeam: homeTeam.trim(),
        awayTeam: awayTeam.trim(),
        category: category.trim(),
      });
    }
  }

  return games;
};


const GameInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [cleanedInput, setCleanedInput] = useState('');
  const [additionalCategory, setAdditionalCategory] = useState('');
  const [games, setGames] = useState<Game[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleCleanInput = () => {
    const cleaned = cleanInput(input);
    
   console.log(cleaned)

    setCleanedInput(cleaned);
  };

  const handleAdditionalCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAdditionalCategory(event.target.value);
  };

  const handleApplyCategory = () => {
    console.log(cleanedInput)
    console.log(additionalCategory)
    const words = cleanedInput.split(/\s+/);
  
    // Contar el número de palabras
    const wordCount = words.length;
    
    // Mostrar el conteo de palabras en la consola
    console.log(`Número de palabras: ${wordCount}`);
  

    const wordsWithSlashes = [];

    for (let i = 0; i < words.length; i += 3) {
      // Obtener las palabras del grupo actual
      const group = words.slice(i, i + 3);
      
      // Unir las palabras del grupo con un espacio y agregar al array final
      wordsWithSlashes.push(group.join(" "));
      
      wordsWithSlashes.push(additionalCategory);

    }
    
    // Convertir el array de palabras con barras de nuevo a una cadena
    const result = wordsWithSlashes.join(' ');
    
    // Mostrar el resultado en la consola
    console.log(result);

    setCleanedInput(result)
  };

  
  

  const handleParseGames = () => {
    const parsedGames = parseGamesInput(cleanedInput);
    setGames(parsedGames);
    console.log(parsedGames)
  };

  return (
    <div>
      <textarea value={input} onChange={handleInputChange} rows={10} cols={50} />
      <button onClick={handleCleanInput}>Clean Input</button>
      <h2>Cleaned Input:</h2>
      <pre>{cleanedInput}</pre>

      {/* Select para insertar categoría adicional */}
      <label htmlFor="additionalCategory">Additional Category:</label>
      <select id="additionalCategory" value={additionalCategory} onChange={handleAdditionalCategoryChange}>
        <option value="">Select...</option>
        <option value="Special">Special</option>
        <option value="Regular">Regular</option>
        <option value="Extra">Extra</option>
      </select>

      {/* Botón para aplicar categoría */}
      <button onClick={handleApplyCategory}>Apply Category</button>

      {/* Botón para analizar juegos */}
      <button onClick={handleParseGames}>Parse Games</button>
      <h2>Parsed Games:</h2>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game.gameTime} - {game.homeTeam} vs {game.awayTeam} ({game.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameInput;