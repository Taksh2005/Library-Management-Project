import { getAllResourceIds } from "./actions/serverActions";
import ResourceCard, { ListViewCard } from "./components/ResourceCard";


export default async function Home() {
  const ids = await getAllResourceIds();
  return (
    <div className="w-full p-4 max-w-400">
      <ul role="list" className="grid lg:grid-cols-2 sm:grid-cols-1 xl:grid-cols-3  divide-y divide-gray-200 dark:divide-gray-700">
          {
            ids.map(id => (
          <ListViewCard key={id} resourceId={id} />
        ))
          }
      </ul>
    </div>
  );
}
