import Spinner from "../_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-end justify-center">
      <Spinner />
      <p className="text-primary-200 text-xl">Loading cabin data...</p>
    </div>
  );
}
