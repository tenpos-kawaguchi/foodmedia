import { useState, useEffect } from "react";
import MenuService, { MenuItemType } from "@/services/MenuService";

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError(null);
        const menuService = new MenuService();
        const categories = await menuService.getMenuCategories();
        setMenuItems(categories);
      } catch (err) {
        console.error("メニューデータの取得に失敗しました:", err);
        setError("メニューデータの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  return { menuItems, loading, error };
};
