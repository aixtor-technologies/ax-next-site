import Image from "next/image";
export default function Loading() {
  return (
    <div className={`loader`}>
      <Image src="/assets/images/Main-Loader.webp" alt="Loading" height={470} width={500} />
    </div>
  );
}
