
import { getUserTemplates, deleteTemplate } from "@/lib/actions/template";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Plus, Edit, Eye, Trash2, Copy, Heart, Sparkles, Calendar } from "lucide-react";
// We need a client component for interactive parts like delete/copy
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let templates: any[] = [];
  let error = null;

  try {
    templates = await getUserTemplates();
  } catch (e) {
    console.error("Failed to fetch templates:", e);
    error = e;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t load your dashboard. This usually happens if the database hasn&apos;t been set up yet.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left overflow-auto max-h-64 mb-6">
             <p className="text-xs font-mono text-gray-500 mb-2">Technical Details:</p>
             <pre className="text-xs text-red-600 font-mono whitespace-pre-wrap">
               {JSON.stringify(error, null, 2)}
             </pre>
          </div>
          <p className="text-sm text-gray-500">
            If you are the developer, please run the SQL schema provided in <code>supa_schema.sql</code>.
          </p>
          <Link href="/" className="mt-8 inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your created memories</p>
          </div>
          <Link
            href="/#templates"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full font-medium shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create New
          </Link>
        </div>

        {/* Templates Grid */}
        {templates.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No memories yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven&apos;t created any templates yet. Start creating beautiful digital memories for your loved ones.
            </p>
            <Link
              href="/#templates"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-pink-500 text-pink-600 rounded-full font-medium hover:bg-pink-50 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Browse Templates
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template : any) => (
              <DashboardClient key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
