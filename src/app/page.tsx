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
    <div className="min-h-screen bg-gray-50">
      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Mein Blog</h1>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Start
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Alle Posts
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Über mich
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-xs px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 font-medium">
              {process.env.NODE_ENV === "production" ? "Production" : "Development"}
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex  w-full max-w-3xl flex-col items-center justify-between gap-4 py-32 px-16 bg-white sm:items-start">
        <h1 className="text-2xl font-bold ">Mein Posts</h1>
<p className="text-gray-600">
            Umgebung: <strong className="font-mono text-blue-600">{process.env.FETCH_URL}</strong>
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
