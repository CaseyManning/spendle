export interface TileProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  isFound: boolean;
  value: number;
  isWrong: boolean;
  foundColor: string;
}

const Tile = ({
  text,
  onClick,
  isSelected,
  isFound,
  value,
  isWrong,
  foundColor,
}: TileProps) => {
  const usdFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  return (
    <div
      className={`bg-stone-200/60 flex flex-col gap-y-2 items-center justify-center border-zinc-200 font-semibold text-black p-4 text-center
         text-sm rounded-sm w-50 h-30 ${isSelected ? "!bg-blue-200" : ""} ${isWrong ? "!bg-red-200 wiggle" : ""} ${!isFound ? "cursor-pointer" : ""}`}
      onClick={onClick}
      style={{
        userSelect: "none",
        ...(isFound ? { backgroundColor: foundColor } : {}),
      }}
    >
      {text}
      {isFound === true && (
        <div className="text-xs font-bold ">{usdFormatted}M</div>
      )}
    </div>
  );
};

export default Tile;
