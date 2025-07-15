import { useState, useEffect } from "react";
import { supabase } from "@/services/supabase";
import { useAuth } from "./useAuth";

export type Profile = {
  id: string;
  display_name: string;
  phone_number: string | null;
  occupation: string | null;
  created_at: string;
  updated_at: string;
};

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const createProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            display_name: "",
            phone_number: null,
            occupation: null,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      throw err instanceof Error
        ? err
        : new Error("プロフィールの作成に失敗しました");
    }
  };

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // プロフィールが存在しない場合は新規作成
          await createProfile(user.id);
        } else {
          throw error;
        }
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("プロフィールの取得に失敗しました")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("ログインが必要です");

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      throw err instanceof Error
        ? err
        : new Error("プロフィールの更新に失敗しました");
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    createProfile,
  };
}
