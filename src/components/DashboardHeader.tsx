interface HeaderProps {
  title: string;
}

export function DashboardHeader({ title }: HeaderProps) {
  return (
    <header className="h-[60px] border-b border-border bg-card flex items-center justify-between px-6" data-ui-chrome>
      <span className="font-mono text-sm font-semibold tracking-wide truncate">{title}</span>
      <span className="font-mono text-xs text-muted-foreground">v0.1</span>
    </header>
  );
}
