"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToCreateRoadMap = () => {
    router.push('/createRoadmap');
  };
  return (
    <button onClick={goToCreateRoadMap}>이동</button>
  );
}
