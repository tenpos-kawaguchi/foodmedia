import styles from '@/app/styles/layouts/column/tow-column.module.css';

export function TowColumn({ children }: { children: React.ReactNode }) {
  return <div className={styles.flexContainer}>{children}</div>;
}
export function TowColumnMain({ children }: { children: React.ReactNode }) {
  return <div className={styles.main}>{children}</div>;
}

export function TowColumnSidebar({ children }: { children: React.ReactNode }) {
  return <div className={styles.sidebar}>{children}</div>;
}
