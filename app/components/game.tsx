import { pce } from "~/pce";
import Tile from "./tile";
import { useEffect, useState } from "react";

export interface GameProps {
  categories: string[][];
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const Game = ({ categories }: GameProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [shuffledCategories, setShuffledCategories] = useState<string[][]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [lives, setLives] = useState<number>(4);

  const colors = [
    "oklch(0.924 0.12 95.746)",
    "oklch(0.925 0.084 155.995)",
    "oklch(0.827 0.119 306.383)",
  ];

  useEffect(() => {
    const shuffledFlat = shuffle(categories.flat());
    const shuffledCategories = [
      shuffledFlat.slice(0, 3),
      shuffledFlat.slice(3, 6),
      shuffledFlat.slice(6, 9),
    ];
    setShuffledCategories(shuffledCategories);
  }, [categories]);

  const handleClick = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  if (selected.length === 3) {
    let foundCategory = false;
    for (const category of categories) {
      if (selected.every((item) => category.includes(item))) {
        foundCategory = true;
      }
    }
    if (foundCategory) {
      setFound([...found, ...selected]);
      setSelected([]);
    } else {
      setWrong(selected);
      setTimeout(() => {
        setWrong([]);
      }, 500);
      setSelected([]);
      setLives(lives - 1);
    }
  }

  return (
    <div className="flex w-full h-full bg-white items-center justify-center">
      <div className="flex flex-col gap-2 relative">
        <p className="text-center text-sm font-semibold pb-4">
          Select the three categories of equivalent consumer spending
        </p>

        {shuffledCategories.map((row) => (
          <div key={row[0]} className="flex flex-row gap-2">
            {row.map((item) => (
              <Tile
                key={item}
                text={item}
                onClick={() => handleClick(item)}
                isSelected={selected.includes(item)}
                value={pce[item as keyof typeof pce]}
                isFound={found.includes(item) || lives === 0}
                isWrong={wrong.includes(item)}
                foundColor={
                  colors[
                    Math.floor(
                      categories.flat().indexOf(item) / categories.length
                    )
                  ]
                }
              />
            ))}
          </div>
        ))}
        {found.length === categories.flat().length && (
          <div className="absolute -bottom-10 left-0 right-0 m-auto w-fit">
            You win!
          </div>
        )}
        <div className="flex flex-row gap-2 items-center justify-center pt-4">
          {Array.from({ length: lives }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 ${i <= lives ? "bg-stone-200" : "bg-stone-200"} rounded-sm`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
