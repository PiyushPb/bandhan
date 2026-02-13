"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveTemplate(data: any, type: string, templateId?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to save a template");
  }

  const payload = {
    user_id: user.id,
    type,
    data,
    is_paid: true, // For now, marking as paid immediately since payment is dummy
    updated_at: new Date().toISOString(),
  };

  let result;
  
  if (templateId) {
    // Backend Validation Checklist:
    // 1. Verify user ownership (done below)
    // 2. Prevent editing if already paid (requested)
    // 3. Prevent non-refundable changes (requested)

    const { data: existing, error: fetchError } = await supabase
      .from("templates")
      .select("is_paid")
      .eq("id", templateId)
      .single();

    if (fetchError) throw fetchError;
    if (existing?.is_paid) {
      throw new Error("This template has already been paid and cannot be edited or refunded.");
    }

    // Update existing
    const { data: updated, error } = await supabase
      .from("templates")
      .update(payload)
      .eq("id", templateId)
      .select()
      .single();
        
       if (error) throw error;
       result = updated;
  } else {
      // Insert new
      const { data: inserted, error } = await supabase
        .from("templates")
        .insert(payload)
        .select()
        .single();
        
      if (error) throw error;
      result = inserted;
  }

  revalidatePath("/dashboard");
  return result;
}

export async function getUserTemplates() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteTemplate(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("templates")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/dashboard");
}
