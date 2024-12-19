import Link from "next/link";
import Navigation from "./_components/Navigation";

export default function Page() {
  return (
    <div>
      <h1>Welcome to the wild nature paradise</h1>
      <Link href="/cabins">Explore the cabins</Link>
    </div>
  );
}
