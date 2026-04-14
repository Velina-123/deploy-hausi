import Image from "next/image";
import Link from "next/link";

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
            <h1 className="text-2xl font-bold text-gray-500">Mein Blog</h1>
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
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Branding & Info */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold text-slate-900">MeinProjekt</h2>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Wir bauen die Zukunft des Webs mit modernsten Technologien und leidenschaftlichem Design.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Produkt</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/features" className="text-sm text-slate-600 hover:text-blue-600 transition">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-slate-600 hover:text-blue-600 transition">Preise</Link></li>
              <li><Link href="/docs" className="text-sm text-slate-600 hover:text-blue-600 transition">Dokumentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Unternehmen</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-slate-600 hover:text-blue-600 transition">Über uns</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-600 hover:text-blue-600 transition">Blog</Link></li>
              <li><Link href="/jobs" className="text-sm text-slate-600 hover:text-blue-600 transition">Karriere</Link></li>
            </ul>
          </div>

          {/* Rechtliches & Socials */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Rechtliches</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-sm text-slate-600 hover:text-blue-600 transition">Datenschutz</Link></li>
              <li><Link href="/imprint" className="text-sm text-slate-600 hover:text-blue-600 transition">Impressum</Link></li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-slate-400 hover:text-slate-600">Twitter</Link>
              <Link href="#" className="text-slate-400 hover:text-slate-600">Github</Link>
              <Link href="#" className="text-slate-400 hover:text-slate-600">Instagram</Link>
            </div>
          </div>
        </div>

        {/* Unterer Bereich */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; 2026 MeinProjekt GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="mt-4 md:mt-0">
            <span className="text-xs text-slate-400">Made with ❤️ in Berlin</span>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
