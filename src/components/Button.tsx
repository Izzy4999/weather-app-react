import { cn } from "../utils/tailwindMerge";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({ children, className, onClick }: Props) {
  return (
    <button
      className={cn(
        "w-full bg-sky-500 py-3 rounded-xl font-bold px-8",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
