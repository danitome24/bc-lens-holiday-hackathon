import Image from "next/image";

export const LensProfileCard = () => {
  return (
    <div className="flex flex-col h-auto py-8 justify-center">
      <h3 className="card-title text-left text-base-content">Lens profile</h3>
      <div className="flex flex-col py-4 justify-center items-center">
        <Image
          className="rounded-full w-16 sm:w-20 md:w-24 lg:w-32"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="Lens Profile Image"
          width={64}
          height={64}
        />
        <p className="text-white font-bold">@meketom</p>
      </div>
    </div>
  );
};
