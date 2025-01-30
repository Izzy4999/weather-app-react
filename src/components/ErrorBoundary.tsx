import { Link } from "react-router";

type Props = {
  error: Error;
  resetErrorBoundary(): void;
};

export default function ErrorBoundary({ error }: Props) {
  console.log(error);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <p>An Error occur </p>
      <div>
        <Link to={"/"}>Go Back home</Link>
      </div>
    </div>
  );
}
