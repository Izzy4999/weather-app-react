
type Props = {
  error: Error;
  resetErrorBoundary(): void;
};

export default function ErrorBoundary({ error }: Props) {
  console.log(error);
  return <div>ErrorBoundary</div>;
}
