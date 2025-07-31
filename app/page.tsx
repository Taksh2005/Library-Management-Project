import { getAllResourceIds } from "./actions/serverActions";
import ResourceCard from "./components/ResourceCard";

export default async function Home() {
  const ids = await getAllResourceIds();

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {ids.map(id => (
          <ResourceCard key={id} resourceId={id} />
        ))}
      </div>
    </main>
  );
}
