
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
    .select('type, data')
    .eq('slug', slug)
    .single();

  if (!template) {
    return {
      title: 'Valentine Gift',
    };
  }

  // Import locally to avoid circular deps if any, or just at top level
  // Since we are in an async function, dynamic import or standard import works.
  // Ideally standard import at top, but for now let's rely on what we have.
  const { TEMPLATES } = await import('@/data/templates/valentine');
  
  const { basicInfo, photos } = template.data;
  const staticTemplate = TEMPLATES.find(t => t.id === template.type);
  
  // Prioritize user photo, then static template thumbnail
  const previewImage = photos?.[0]?.url || staticTemplate?.thumbnailUrl || '/og-default.jpg';
  
  const title = `A Valentine Surprise for ${basicInfo.toName || 'You'} ❤️`;
  const description = `A special message from ${basicInfo.fromName || 'Someone special'}. Click to open!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: 'Valentine Gift Preview',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [previewImage],
    },
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
