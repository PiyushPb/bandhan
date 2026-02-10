
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PublicTemplateViewer from '@/components/valentine/PublicTemplateViewer';

// Generate metadata for social sharing
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug }  = await params;
  const supabase = await createClient();
  
  const { data: template } = await supabase
    .from('templates')
    .select('data')
    .eq('slug', slug)
    .single();

  if (!template) {
    return {
      title: 'Valentine Gift',
    };
  }

  const { basicInfo } = template.data;
  return {
    title: `A Valentine Surprise for ${basicInfo.toName}`,
    description: `From ${basicInfo.fromName}`,
  };
}

export default async function PublicTemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: template, error } = await supabase
    .from('templates')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !template) {
    console.error('Template fetch error:', error);
    notFound();
  }

  return <PublicTemplateViewer type={template.type} data={template.data} />;
}
