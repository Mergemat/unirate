import Image from "next/image";
import { api } from "~/trpc/server";
import { imageShimmer, toBase64 } from "~/utils/images";

export default async function UniPage({ params }: { params: { id: string } }) {
  const uniId = Number(params.id);

  if (isNaN(uniId)) {
    return <div>Invalid ID</div>;
  }

  const uni = await api.uni.byId({ id: uniId });

  if (!uni) {
    return <div>Университет с ID {uniId} не существует</div>;
  }

  return (
    <>
      <Image
        src={uni.imageUrl}
        alt={""}
        style={{ objectFit: "cover", width: "100%", height: "400px" }}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          imageShimmer(1000, 400),
        )}`}
        width={1000}
        height={400}
      />
      <div className="flex mt-10 w-full max-w-screen-2xl flex-col gap-5 p-2 lg:justify-between xl:mx-auto">
        <h1 className="text-4xl font-bold">{uni.name}</h1>
      </div>
    </>
  );
}
