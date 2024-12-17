import "../../styles/Home.module.css";
import Link from 'next/link'
export default function IndexPage() {
  return (
    <div className="p-3 vstack gap-3">
      <h1>Sign-in using CMU EntraID Example</h1>
      <Link href={`${process.env.NEXT_PUBLIC_CMU_ENTRAID_URL}`}>
        <button className="btn btn-primary">Sign-in with CMU Account</button>
      </Link>
    </div>
  );
}