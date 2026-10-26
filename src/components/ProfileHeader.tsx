import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  avatar?: string;
};

export default function ProfileHeader({ name, bio, avatar }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative size-40 overflow-hidden rounded-full bg-emerald-100 ring-4 ring-white shadow-md sm:size-48 dark:bg-emerald-900 dark:ring-neutral-800">
        {avatar ? (
          <Image src={avatar} alt={`${name} 프로필 사진`} fill sizes="(min-width: 640px) 192px, 160px" className="object-cover" priority />
        ) : (
          <span className="flex h-full items-center justify-center text-4xl font-semibold text-emerald-700 dark:text-emerald-200">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <h1 className="mt-5 text-xl font-bold sm:text-2xl">{name}</h1>
      <p className="mt-2 text-sm text-neutral-600 sm:text-base dark:text-neutral-400">{bio}</p>
    </header>
  );
}
