type Props = {
  imgUrl: string;
  days: string;
  tempRange: string;
};

export default function WeatherList({ days, tempRange, imgUrl }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-12 w-10 px-1 py-1 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
        <img src={imgUrl} className="bg-center" />
      </div>
      <div className="flex-1 text-lg">{days}</div>
      <div className="text-[15px]">{tempRange}</div>
    </div>
  );
}
