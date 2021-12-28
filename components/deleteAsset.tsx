import { useRouter } from "next/router";
import { AssetType } from "../lib/types";

export const DeleteAsset = ({ asset }: { asset: AssetType }) => {
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        const body = { id: asset.id };
        await fetch("/api/asset/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        refreshData();
      }}
      className="bg-red-400 p-2 rounded-md text-white font-bold border-2 border-red-500 outline-none cursor-pointer"
    >
      Delete ×
    </button>
  );
};
