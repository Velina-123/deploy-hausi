import Image from "next/image";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function Home() {
  const url: string | undefined = process.env.FETCH_URL //|| "https://jsonplaceholder.typicode.com/posts";

  console.log("Die URL ist:", url);

  if (!url) {
     return (<div>
        <p>
          Kein Link gefunden.
        </p>
      </div>);
  }

    const res= await fetch(url);

    if(!res.ok) {
      return (<div>
        <p>
          Keine Daten gefunden.
        </p>
      </div>);
    }

    const data: Post[] = await res.json();

  return (
    <div>
      <main className="flex  w-full max-w-3xl flex-col items-center justify-between gap-4 py-32 px-16 bg-white sm:items-start">
        <h1 className="text-2xl font-bold ">Mein Posts</h1>
        <p>
          Umgebung: <strong>{process.env.FETCH_URL}</strong>
        </p>
      <ul className="flex items-start flex-col gap-2">

      {data.slice(0, 10).map((item)=>(
        <li key={item.id} className="text-xl  text-slate-600">
          <h3 className="font-bold">{item.id}. {item.title}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
    </main>
    </div>
  );
}
