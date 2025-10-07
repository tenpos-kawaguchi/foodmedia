import { useState, useEffect } from 'react';
import MenuService, { MenuItem } from '@/services/MenuService';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError(null);
        const menuService = new MenuService();
        const menu = await menuService.getMainMenu();

        if (menu && menu.menuItems && menu.menuItems.nodes) {
          setMenuItems(menu.menuItems.nodes);
        } else {
          setMenuItems([]);
        }
      } catch (err) {
        console.error('メニューデータの取得に失敗しました:', err);
        setError('メニューデータの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  return { menuItems, loading, error };
};
