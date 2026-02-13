
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { TEMPLATES } from '@/data/templates/valentine';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    // Generate a unique slug
    const slug = nanoid(10);

    // Get current user if logged in, otherwise we might need a way to handle anonymous purchases
    // For now, assuming user is logged in or we use a system user for anonymous?
    // The schema says `user_id uuid references auth.users` and is NOT NULL.
    // So the user MUST be logged in. 
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
         return NextResponse.json(
            { error: 'User must be logged in to create a template' },
            { status: 401 }
         );
    }

    // Validate photo limits
    const templateId = data.selectedTemplate;
    const template = TEMPLATES.find(t => t.id === templateId);
    
    if (template && template.maxPhotos) {
        const photoCount = data.photos?.length || 0;
        if (photoCount > template.maxPhotos) {
            return NextResponse.json(
                { error: `You can only upload up to ${template.maxPhotos} photos for this template.` },
                { status: 400 }
            );
        }
    }

    const { error } = await supabase.from('templates').insert({
      user_id: user.id,
      type: data.selectedTemplate, // e.g., 'love-timeline'
      slug: slug,
      data: data, // Stores the entire JSON blob including photos array
      is_paid: true, // Mark as paid immediately since this is post-payment
    });

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
    
    return NextResponse.json({ 
      success: true, 
      slug: slug,
      orderId: data.paymentId || data.razorpayOrderId,
      message: 'Order created successfully' 
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
